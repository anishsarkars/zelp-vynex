"use client";
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { listVaults, VaultData } from '@/lib/web3';
import { useWeb3ModalProvider, useWeb3ModalAccount, useWeb3Modal } from '@web3modal/ethers/react';
import { APP_CONFIG } from '@/lib/config';
import Link from 'next/link';
import BackgroundVideo from '@/components/BackgroundVideo';

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'redeem'>('deposit');
  const [payMethod, setPayMethod] = useState<'asset' | 'stable'>('asset');
  
  const [vaults, setVaults] = useState<VaultData[]>([]);
  const [loadingVaults, setLoadingVaults] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  const [amountInput, setAmountInput] = useState('');
  const [txPending, setTxPending] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    if (isConnected && walletProvider) {
      setWalletAddress(address as string);
      const ethersProvider = new ethers.BrowserProvider(walletProvider as any);
      ethersProvider.getSigner().then(setSigner);
    } else {
      setWalletAddress(null);
      setSigner(null);
    }
  }, [isConnected, walletProvider, address]);

  useEffect(() => {
    async function load() {
      try {
        setFetchError(null);
        const vs = await listVaults(walletAddress || undefined);
        setVaults(vs);
      } catch(e: any) {
        console.error(e);
        setFetchError(e.message || "Failed to read from chain.");
      } finally {
        setLoadingVaults(false);
      }
    }
    load();
  }, [walletAddress]);

  async function handleConnect() {
    await open();
  }

  async function handleDeposit() {
    if (!signer || !walletAddress) return alert("Please connect wallet.");
    const vault = vaults[selectedVaultIndex];
    if (!vault) return alert("Select a vault.");
    if (!amountInput || isNaN(Number(amountInput)) || Number(amountInput) <= 0) return alert("Invalid amount.");

    if (payMethod === 'stable' && vault.assetSymbol !== 'USDG') {
      return alert("Zapping from USDG to " + vault.assetSymbol + " is coming soon!");
    }

    setTxPending(true);
    setStatusMsg("Preparing deposit...");
    try {
      const parsedAmount = ethers.parseUnits(amountInput, vault.decimals);
      
      const assetContract = new ethers.Contract(vault.asset, [
        "function allowance(address, address) view returns (uint256)",
        "function approve(address, uint256) returns (bool)"
      ], signer);

      setStatusMsg("Checking allowance...");
      const allowance = await assetContract.allowance(walletAddress, vault.address);
      if (allowance < parsedAmount) {
        setStatusMsg("Approving token...");
        const txApprove = await assetContract.approve(vault.address, ethers.MaxUint256);
        await txApprove.wait();
      }

      setStatusMsg("Depositing...");
      const vaultContract = new ethers.Contract(vault.address, [
        "function deposit(uint256, address) returns (uint256)"
      ], signer);
      const tx = await vaultContract.deposit(parsedAmount, walletAddress);
      await tx.wait();

      setStatusMsg("Deposit successful!");
      const vs = await listVaults(walletAddress);
      setVaults(vs);
      setAmountInput('');
    } catch (err: any) {
      console.error(err);
      setStatusMsg("Transaction failed: " + (err.reason || err.message));
    } finally {
      setTxPending(false);
      setTimeout(() => setStatusMsg(''), 5000);
    }
  }

  async function handleRedeem() {
    if (!signer || !walletAddress) return alert("Please connect wallet.");
    const vault = vaults[selectedVaultIndex];
    if (!vault) return alert("Select a vault.");
    if (!amountInput || isNaN(Number(amountInput)) || Number(amountInput) <= 0) return alert("Invalid amount.");

    setTxPending(true);
    setStatusMsg("Preparing redeem...");
    try {
      const parsedShares = ethers.parseUnits(amountInput, vault.decimals);
      
      setStatusMsg("Redeeming...");
      const vaultContract = new ethers.Contract(vault.address, [
        "function redeem(uint256, address, address) returns (uint256)"
      ], signer);
      const tx = await vaultContract.redeem(parsedShares, walletAddress, walletAddress);
      await tx.wait();

      setStatusMsg("Redeem successful!");
      const vs = await listVaults(walletAddress);
      setVaults(vs);
      setAmountInput('');
    } catch (err: any) {
      console.error(err);
      setStatusMsg("Transaction failed: " + (err.reason || err.message));
    } finally {
      setTxPending(false);
      setTimeout(() => setStatusMsg(''), 5000);
    }
  }

  const selectedVault = vaults[selectedVaultIndex];
  let receiveText = "—";
  let sharePriceText = "—";
  let feeText = "—";
  let maxBalance = 0;
  let maxBalanceRaw = 0n;
  let balanceSymbol = "";

  if (selectedVault) {
    const sp = Number(ethers.formatUnits(selectedVault.pricePerShare, selectedVault.decimals));
    sharePriceText = `${sp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${selectedVault.assetSymbol} / share`;
    feeText = `${(selectedVault.feeBps / 100).toFixed(2)}%`;

    if (activeTab === 'deposit') {
      maxBalanceRaw = selectedVault.assetBalance || 0n;
      maxBalance = Number(ethers.formatUnits(maxBalanceRaw, selectedVault.decimals));
      balanceSymbol = selectedVault.assetSymbol;
    } else {
      maxBalanceRaw = selectedVault.shares || 0n;
      maxBalance = Number(ethers.formatUnits(maxBalanceRaw, selectedVault.decimals));
      balanceSymbol = selectedVault.symbol;
    }

    if (amountInput && !isNaN(Number(amountInput))) {
      const amt = Number(amountInput);
      if (activeTab === 'deposit') {
        const received = amt / sp;
        receiveText = `${received.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${selectedVault.symbol}`;
      } else {
        const received = amt * sp;
        receiveText = `${received.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${selectedVault.assetSymbol}`;
      }
    }
  }

  function handleMax() {
    if (maxBalance > 0) {
      setAmountInput(ethers.formatUnits(maxBalanceRaw, selectedVault.decimals));
    }
  }

  return (
    <>
      <BackgroundVideo src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_084718_72a17915-4964-4059-afcd-22d59399b72e.mp4" />
      <div className="page-scrim" aria-hidden="true" />

      {/* ===== NAV ===== */}
      <header className="nav" id="nav">
        <div className="wrap nav-inner">
          <Link className="brand" href="/">
            <img src="/logo.png" alt="Zelp Logo" className="brand-mark" style={{ padding: 0, objectFit: 'cover' }} />
            <span className="brand-name">Zelp</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <Link href="/#yieldshares">YieldShares</Link>
            <Link href="/#how">How it works</Link>
            <Link href="/borrow">Borrow</Link>
            <Link href="/docs">Docs</Link>
          </nav>

          <div className="nav-cta">
            <a className="nav-x" href="https://x.com/tryzelp" aria-label="Zelp on X" title="Zelp on X" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25h6.816l4.713 6.231 5.461-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>
            </a>
            {walletAddress ? (
              <span className="btn btn-line" id="walletChip">{walletAddress.substring(0, 6)}...{walletAddress.substring(38)}</span>
            ) : (
              <button className="btn btn-primary" id="connectBtn" onClick={handleConnect}>Connect wallet</button>
            )}
          </div>
        </div>
      </header>

      {/* ===== APP MAIN ===== */}
      <main className="app-main" style={{ paddingTop: '56px', paddingBottom: '120px' }}>
        <div className="wrap">
          <div className="app-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div style={{ maxWidth: '640px' }}>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: '42px', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '16px' }}>YieldShares</h1>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>Deposit a pool asset, hold a tradeable ERC-20, redeem at the on-chain price. Every figure below is read from <span>Robinhood Chain</span>.</p>
              <p className="app-hint" style={{ fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: 1.5, padding: '16px', background: 'rgba(25,25,25,0.6)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}><b>Holding USDG?</b> That is the chain's dollar. It has its own vault, <b>ys-USDG</b>, first in the list and already selected in the form. Pick an amount and deposit. You do not need to own a stock.</p>
            </div>
            <div className="right">
              <span className="pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.72)', borderRadius: '999px', padding: '7px 15px', fontSize: '13.5px', fontWeight: 500, color: 'var(--ink-2)', backdropFilter: 'var(--blur)' }}>
                <span className="dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 3px rgba(62,122,75,.22)' }} /> 
                <b>Robinhood Chain</b>
              </span>
            </div>
          </div>

          <div className="app-cols">
            
            {/* vault list */}
            <section className="panel">
              <div className="panel-head">
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 400 }}>Vaults</h2>
                <span className="sub" style={{ fontSize: '13px', color: 'var(--ink-3)' }}></span>
              </div>
              <div className="panel-body">
                {fetchError ? (
                  <div className="empty" style={{ padding: '40px', textAlign: 'center', color: '#f87171', background: 'rgba(25,25,25,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    <b>Network Error</b>
                    <p style={{ marginTop: '8px', fontSize: '14px' }}>{fetchError}</p>
                  </div>
                ) : loadingVaults ? (
                  <div className="empty" style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-2)', background: 'rgba(25,25,25,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    <p>Reading the chain…</p>
                  </div>
                ) : vaults.length === 0 ? (
                  <div className="empty" style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-2)', background: 'rgba(25,25,25,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    <b>The factory has no vaults</b>
                  </div>
                ) : (
                  <table className="vault-table">
                    <thead>
                      <tr>
                        <th>Vault</th>
                        <th className="num hide-sm">Total assets</th>
                        <th className="num hide-sm">Share price</th>
                        <th className="num"><span className="wide-only">In your </span>Wallet</th>
                        <th className="num">Your position</th>
                        <th className="num"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {vaults.map((v, i) => {
                        const totalAssetsFmt = Number(ethers.formatUnits(v.totalAssets, v.decimals)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        const priceFmt = Number(ethers.formatUnits(v.pricePerShare, v.decimals)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                        const balFmt = v.assetBalance && v.assetBalance > 0n ? Number(ethers.formatUnits(v.assetBalance, v.decimals)).toLocaleString(undefined, { maximumFractionDigits: 4 }) : "0";
                        const posFmt = v.shares && v.shares > 0n ? Number(ethers.formatUnits(v.shares, v.decimals)).toLocaleString(undefined, { maximumFractionDigits: 4 }) : "—";
                        
                        return (
                          <tr key={v.address}>
                            <td>
                              <a href={`${APP_CONFIG.chain.explorer}/address/${v.asset}`} target="_blank" rel="noopener noreferrer" className="vault-asset" style={{ textDecoration: 'none' }}>
                                <div className="stock-logo" style={{ overflow: 'hidden', padding: 0 }}>
                                  <img src={`https://www.google.com/s2/favicons?domain=${(APP_CONFIG.vaults.assets as any)[v.assetSymbol]?.domain || `${v.name.split(' ')[0].toLowerCase()}.com`}&sz=128`} alt={v.symbol} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
                                </div>
                                <span>
                                  <b style={{ transition: 'color 0.2s' }}>{v.symbol}</b>
                                  <small>{v.name}</small>
                                </span>
                              </a>
                            </td>
                            <td className="num hide-sm">{totalAssetsFmt} {v.assetSymbol}</td>
                            <td className="num hide-sm">{priceFmt}</td>
                            <td className="num">{walletAddress ? (v.assetBalance && v.assetBalance > 0n ? <b>{balFmt} {v.assetSymbol}</b> : "0") : "—"}</td>
                            <td className="num">{v.shares && v.shares > 0n ? `${posFmt} ${v.assetSymbol}` : "—"}</td>
                            <td className="num">
                              {v.assetBalance && v.assetBalance > 0n ? (
                                <button className="btn btn-primary btn-sm" onClick={() => { setActiveTab('deposit'); setSelectedVaultIndex(i); window.scrollTo({ top: 300, behavior: 'smooth' }); }}>Deposit</button>
                              ) : (
                                <a className="btn btn-line btn-sm" href={`${APP_CONFIG.chain.explorer}/address/${v.address}`} target="_blank" rel="noopener noreferrer">Contract</a>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </section>

            {/* deposit / redeem */}
            <section className="panel">
              <div className="panel-head">
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 400 }}>{activeTab === 'deposit' ? 'Deposit' : 'Redeem'}</h2>
                <span className="sub">
                  <span className="tabs">
                    <button onClick={() => { setActiveTab('deposit'); setAmountInput(''); }} className={activeTab === 'deposit' ? 'active' : ''}>Deposit</button>
                    <button onClick={() => { setActiveTab('redeem'); setAmountInput(''); }} className={activeTab === 'redeem' ? 'active' : ''}>Redeem</button>
                  </span>
                </span>
              </div>
              
              <div className="panel-body animate-in fade-in duration-300">
                <div className="field" style={{ marginBottom: '16px' }}>
                  <label htmlFor="vaultSelect" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, marginBottom: '8px' }}>Vault</label>
                  <select id="vaultSelect" value={selectedVaultIndex} onChange={e => setSelectedVaultIndex(Number(e.target.value))} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)', background: 'rgba(20,20,20,0.8)', color: 'var(--ink)', fontSize: '15px' }}>
                    {loadingVaults ? <option>Loading vaults...</option> : vaults.length === 0 ? <option>No vaults</option> : vaults.map((v, i) => (
                      <option key={v.address} value={i}>{v.symbol} · {v.name}</option>
                    ))}
                  </select>
                </div>

                {activeTab === 'deposit' && (
                  <div className="field" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, marginBottom: '8px' }}>Pay with</label>
                    <span className="tabs pay-tabs">
                      <button onClick={() => setPayMethod('asset')} className={payMethod === 'asset' ? 'active' : ''}>The asset</button>
                      <button onClick={() => setPayMethod('stable')} className={payMethod === 'stable' ? 'active' : ''}>USDG</button>
                    </span>
                  </div>
                )}

                <div className="field" style={{ marginBottom: '24px' }}>
                  <label htmlFor="amountInput" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, marginBottom: '8px' }}>
                    {activeTab === 'deposit' ? 'Amount to deposit' : 'Amount to redeem'}
                  </label>
                  <input id="amountInput" value={amountInput} onChange={e => setAmountInput(e.target.value)} type="text" inputMode="decimal" placeholder="0.0" autoComplete="off" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)', background: 'rgba(20,20,20,0.8)', color: 'var(--ink)', fontFamily: 'var(--mono)', fontSize: '16px' }} />
                  <span className="hint" style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink-3)', marginTop: '8px' }}>
                    {walletAddress && selectedVault ? (
                      <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={handleMax} onMouseOver={e => e.currentTarget.style.color = 'var(--green)'} onMouseOut={e => e.currentTarget.style.color = 'var(--ink-3)'}>
                        Balance: {maxBalance.toLocaleString(undefined, { maximumFractionDigits: 4 })} {balanceSymbol}
                      </span>
                    ) : 'Connect a wallet to see your balance.'}
                  </span>
                </div>

                {walletAddress ? (
                  <button className="btn btn-primary btn-lg" style={{ width: '100%', padding: '16px', opacity: txPending ? 0.7 : 1, pointerEvents: txPending ? 'none' : 'auto' }} onClick={activeTab === 'deposit' ? handleDeposit : handleRedeem}>
                    {txPending ? 'Processing...' : (activeTab === 'deposit' ? 'Deposit' : 'Redeem')}
                  </button>
                ) : (
                  <button className="btn btn-primary btn-lg" style={{ width: '100%', padding: '16px' }} onClick={handleConnect}>Connect wallet</button>
                )}

                {statusMsg && (
                  <div style={{ marginTop: '16px', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13.5px', color: 'var(--ink-2)', textAlign: 'center' }}>
                    {statusMsg}
                  </div>
                )}

                <dl className="kv" style={{ display: 'grid', gap: '12px', background: 'var(--paper)', padding: '20px', borderRadius: '12px', marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt style={{ fontSize: '14px', color: 'var(--ink-2)' }}>You receive</dt><dd style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 600 }}>{receiveText}</dd></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Share price</dt><dd style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 600 }}>{sharePriceText}</dd></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--line-2)' }}><dt style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Protocol fee on harvests</dt><dd style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 600 }}>{feeText}</dd></div>
                </dl>
              </div>
            </section>
          </div>

        </div>
      </main>

      <footer className="footer">
        <div className="wrap foot-bottom" style={{ marginTop: 0, borderTop: 0 }}>
          <span>© 2026 Zelp. Experimental software. Not investment advice.</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>CA: Not launched</span>
        </div>
      </footer>
    </>
  );
}
