"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import BackgroundVideo from '@/components/BackgroundVideo';

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'redeem'>('deposit');
  const [payMethod, setPayMethod] = useState<'asset' | 'stable'>('asset');

  return (
    <>
      <BackgroundVideo src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4" />
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
            <a className="nav-x" href="#" aria-label="Zelp on Discord" title="Zelp on Discord" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M19.27 5.33A16.5 16.5 0 0 0 15.2 4.1a.06.06 0 0 0-.07.03c-.18.32-.38.73-.52 1.06a15.3 15.3 0 0 0-4.6 0 10.6 10.6 0 0 0-.53-1.06.06.06 0 0 0-.07-.03A16.5 16.5 0 0 0 5.33 5.33a.06.06 0 0 0-.03.02C2.7 9.24 2 13.03 2.34 16.77c0 .02.01.04.03.05a16.6 16.6 0 0 0 5 2.53.06.06 0 0 0 .07-.02c.39-.53.73-1.09 1.02-1.68a.06.06 0 0 0-.03-.08 11 11 0 0 1-1.56-.74.06.06 0 0 1 0-.1l.31-.24a.06.06 0 0 1 .06 0 11.8 11.8 0 0 0 10.03 0 .06.06 0 0 1 .06 0l.31.25a.06.06 0 0 1 0 .1c-.5.29-1.02.53-1.56.74a.06.06 0 0 0-.03.08c.3.59.64 1.15 1.02 1.68a.06.06 0 0 0 .07.02 16.5 16.5 0 0 0 5-2.53.06.06 0 0 0 .03-.05c.4-4.32-.67-8.08-2.86-11.42a.05.05 0 0 0-.03-.02ZM8.89 14.49c-.98 0-1.79-.9-1.79-2.01s.8-2.02 1.8-2.02c1 0 1.8.91 1.79 2.02 0 1.1-.8 2.01-1.8 2.01Zm6.24 0c-.98 0-1.79-.9-1.79-2.01s.79-2.02 1.79-2.02 1.8.91 1.79 2.02c0 1.1-.79 2.01-1.79 2.01Z"/></svg>
            </a>
            <a className="nav-x" href="#" aria-label="Zelp on X" title="Zelp on X" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25h6.816l4.713 6.231 5.461-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>
            </a>
            <button className="btn btn-primary" id="connectBtn">Connect wallet</button>
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
              <p className="app-hint" style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.5, padding: '16px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px', border: '1px solid var(--line-2)' }}><b>Holding USDG?</b> That is the chain's dollar. It has its own vault, <b>ys-USDG</b>, first in the list and already selected in the form. Pick an amount and deposit. You do not need to own a stock.</p>
            </div>
            <div className="right">
              <span className="pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.72)', borderRadius: '999px', padding: '7px 15px', fontSize: '13.5px', fontWeight: 500, color: 'var(--ink-2)', backdropFilter: 'var(--blur)' }}>
                <span className="dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 3px rgba(62,122,75,.22)' }} /> 
                <b>Robinhood Chain</b>
              </span>
            </div>
          </div>

          <div className="app-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* vault list */}
            <section className="panel" style={{ background: 'var(--surface)', backdropFilter: 'var(--surface-blur)', borderRadius: 'var(--r)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
              <div className="panel-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 400 }}>Vaults</h2>
                <span className="sub" style={{ fontSize: '13px', color: 'var(--ink-3)' }}></span>
              </div>
              <div className="panel-body">
                <div className="empty" style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-3)', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
                  <p>Reading the chain…</p>
                </div>
              </div>
            </section>

            {/* deposit / redeem */}
            <section className="panel" style={{ background: 'var(--surface)', backdropFilter: 'var(--surface-blur)', borderRadius: 'var(--r)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
              <div className="panel-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 400 }}>{activeTab === 'deposit' ? 'Deposit' : 'Redeem'}</h2>
                <span className="sub">
                  <span className="tabs" style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.5)', padding: '4px', borderRadius: '999px' }}>
                    <button onClick={() => setActiveTab('deposit')} className={`btn ${activeTab === 'deposit' ? 'btn-primary' : ''}`} style={{ padding: '6px 16px', fontSize: '13.5px', background: activeTab === 'deposit' ? '' : 'transparent', color: activeTab === 'deposit' ? '' : 'var(--ink-2)' }}>Deposit</button>
                    <button onClick={() => setActiveTab('redeem')} className={`btn ${activeTab === 'redeem' ? 'btn-primary' : ''}`} style={{ padding: '6px 16px', fontSize: '13.5px', background: activeTab === 'redeem' ? '' : 'transparent', color: activeTab === 'redeem' ? '' : 'var(--ink-2)' }}>Redeem</button>
                  </span>
                </span>
              </div>
              
              <div className="panel-body animate-in fade-in duration-300">
                <div className="field" style={{ marginBottom: '16px' }}>
                  <label htmlFor="vaultSelect" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, marginBottom: '8px' }}>Vault</label>
                  <select id="vaultSelect" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>
                    <option>No vaults</option>
                  </select>
                </div>

                {activeTab === 'deposit' && (
                  <div className="field" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, marginBottom: '8px' }}>Pay with</label>
                    <span className="tabs pay-tabs" style={{ display: 'inline-flex', gap: '4px', background: 'rgba(255,255,255,0.5)', padding: '4px', borderRadius: '999px', marginBottom: '8px' }}>
                      <button onClick={() => setPayMethod('asset')} className={`btn ${payMethod === 'asset' ? 'btn-primary' : ''}`} style={{ padding: '6px 16px', fontSize: '13.5px', background: payMethod === 'asset' ? '' : 'transparent', color: payMethod === 'asset' ? '' : 'var(--ink-2)' }}>The asset</button>
                      <button onClick={() => setPayMethod('stable')} className={`btn ${payMethod === 'stable' ? 'btn-primary' : ''}`} style={{ padding: '6px 16px', fontSize: '13.5px', background: payMethod === 'stable' ? '' : 'transparent', color: payMethod === 'stable' ? '' : 'var(--ink-2)' }}>USDG</button>
                    </span>
                  </div>
                )}

                <div className="field" style={{ marginBottom: '24px' }}>
                  <label htmlFor="amountInput" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, marginBottom: '8px' }}>
                    {activeTab === 'deposit' ? 'Amount to deposit' : 'Amount to redeem'}
                  </label>
                  <input id="amountInput" type="text" inputMode="decimal" placeholder="0.0" autoComplete="off" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--mono)', fontSize: '16px' }} />
                  <span className="hint" style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink-3)', marginTop: '8px' }}>Connect a wallet to see your balance.</span>
                </div>

                <button className="btn btn-primary btn-lg" style={{ width: '100%', padding: '16px' }} disabled>Connect wallet</button>

                <dl className="kv" style={{ display: 'grid', gap: '12px', background: 'var(--paper)', padding: '20px', borderRadius: '12px', marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt style={{ fontSize: '14px', color: 'var(--ink-2)' }}>You receive</dt><dd style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 600 }}>—</dd></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Share price</dt><dd style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 600 }}>—</dd></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--line-2)' }}><dt style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Protocol fee on harvests</dt><dd style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 600 }}>—</dd></div>
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
