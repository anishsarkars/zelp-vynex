"use client";
import React, { useState } from 'react';
import BackgroundVideo from '@/components/BackgroundVideo';

const assets = [
  { ticker: 'NVDA', name: 'NVIDIA', price: '$128.50', change: '+2.4%', up: true },
  { ticker: 'TSLA', name: 'Tesla', price: '$214.20', change: '+1.1%', up: true },
  { ticker: 'AAPL', name: 'Apple', price: '$228.10', change: '-0.3%', up: false },
  { ticker: 'MSFT', name: 'Microsoft', price: '$445.60', change: '+0.8%', up: true },
  { ticker: 'AMZN', name: 'Amazon', price: '$186.40', change: '+1.7%', up: true },
  { ticker: 'GOOGL', name: 'Alphabet', price: '$178.90', change: '-0.5%', up: false },
  { ticker: 'META', name: 'Meta', price: '$512.30', change: '+3.1%', up: true },
  { ticker: 'AMD', name: 'AMD', price: '$148.90', change: '+2.0%', up: true },
  { ticker: 'AVGO', name: 'Broadcom', price: '$162.40', change: '+0.6%', up: true },
  { ticker: 'NFLX', name: 'Netflix', price: '$685.20', change: '-1.2%', up: false },
  { ticker: 'COIN', name: 'Coinbase', price: '$218.40', change: '+4.3%', up: true },
  { ticker: 'PLTR', name: 'Palantir', price: '$31.80', change: '+1.9%', up: true },
  { ticker: 'ORCL', name: 'Oracle', price: '$142.10', change: '+0.4%', up: true },
  { ticker: 'SPY', name: 'S&P 500 ETF', price: '$562.40', change: '+0.7%', up: true },
  { ticker: 'QQQ', name: 'Nasdaq 100 ETF', price: '$485.10', change: '+1.1%', up: true },
  { ticker: 'COST', name: 'Costco', price: '$884.20', change: '-0.2%', up: false },
];

const stats = [
  { value: '10%', label: 'Protocol cut on harvested fees' },
  { value: '20%', label: 'Hard cap in contract code' },
  { value: '0', label: 'Block withdrawal delay' },
  { value: '16', label: 'Live vaults on mainnet' },
];

export default function ZelpLanding() {
  const [copied, setCopied] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [depositAmt, setDepositAmt] = useState('');
  const [depositDone, setDepositDone] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('Not launched');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmt) return;
    setDepositDone(true);
    setTimeout(() => { setDepositDone(false); setDepositOpen(false); setDepositAmt(''); }, 1800);
  };

  return (
    <>
      <BackgroundVideo src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4" />
      <div className="page-scrim" aria-hidden="true" />

      {/* ===== NAV ===== */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#">
            <img src="/logo.png" alt="Zelp Logo" className="brand-mark" style={{ padding: 0, objectFit: 'cover' }} />
            <span className="brand-name">Zelp</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#yieldshares">YieldShares</a>
            <a href="#trading">Private trading</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
            <a href="/docs">Docs</a>
            <a href="#borrow">Borrow</a>
          </nav>

          <div className="nav-cta">
            <a className="nav-x" href="#" aria-label="Discord">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M19.27 5.33A16.5 16.5 0 0 0 15.2 4.1a.06.06 0 0 0-.07.03c-.18.32-.38.73-.52 1.06a15.3 15.3 0 0 0-4.6 0 10.6 10.6 0 0 0-.53-1.06.06.06 0 0 0-.07-.03A16.5 16.5 0 0 0 5.33 5.33a.06.06 0 0 0-.03.02C2.7 9.24 2 13.03 2.34 16.77c0 .02.01.04.03.05a16.6 16.6 0 0 0 5 2.53.06.06 0 0 0 .07-.02c.39-.53.73-1.09 1.02-1.68a.06.06 0 0 0-.03-.08 11 11 0 0 1-1.56-.74.06.06 0 0 1 0-.1l.31-.24a.06.06 0 0 1 .06 0 11.8 11.8 0 0 0 10.03 0 .06.06 0 0 1 .06 0l.31.25a.06.06 0 0 1 0 .1c-.5.29-1.02.53-1.56.74a.06.06 0 0 0-.03.08c.3.59.64 1.15 1.02 1.68a.06.06 0 0 0 .07.02 16.5 16.5 0 0 0 5-2.53.06.06 0 0 0 .03-.05c.4-4.32-.67-8.08-2.86-11.42a.05.05 0 0 0-.03-.02ZM8.89 14.49c-.98 0-1.79-.9-1.79-2.01s.8-2.02 1.8-2.02c1 0 1.8.91 1.79 2.02 0 1.1-.8 2.01-1.8 2.01Zm6.24 0c-.98 0-1.79-.9-1.79-2.01s.79-2.02 1.79-2.02 1.8.91 1.79 2.02c0 1.1-.79 2.01-1.79 2.01Z"/></svg>
            </a>
            <a className="nav-x" href="#" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25h6.816l4.713 6.231 5.461-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>
            </a>
            <button suppressHydrationWarning className="btn btn-primary btn-badge" onClick={() => setDepositOpen(true)}>
              Open app <span className="arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-glass">
            <span className="pill">
              <span className="dot" />
              Built on <b>Robinhood Chain</b>
            </span>

            <h1 className="hero-title">Zelp</h1>

            <p className="hero-sub">
              YieldShares turn a liquidity position into a plain ERC-20 you can trade, lend or post as collateral. Private routing brings crypto and tokenized stocks on chain without broadcasting your order.
            </p>

            <div className="hero-actions">
              <button suppressHydrationWarning className="btn btn-primary btn-lg" onClick={() => setDepositOpen(true)}>Open the app →</button>
              <a className="btn btn-line btn-lg" href="#how">See how it works</a>
            </div>

            <div className="hero-chips">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>
                v4 hook vaults
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.4 8.8 8 10 4.6-1.2 8-5 8-10V6l-8-4Z"/></svg>
                LP as ERC-20
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17 9 7l3 6 3-3 5 7"/></svg>
                Intent routing
              </span>
            </div>

            <div className="ca-chip" onClick={handleCopy} role="button" tabIndex={0} suppressHydrationWarning>
              <span className="ca-label">CA</span>
              <span className="ca-value">Not launched</span>
              <span className="ca-copy">{copied ? 'Copied!' : 'Copy'}</span>
            </div>
          </div>
        </div>

        {/* Floating vault card */}
        <div className="wrap">
          <div className="float-card" aria-hidden="true">
            <div className="fc-top">
              <div className="fc-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/>
                </svg>
              </div>
              <div>
                <div className="fc-title">Your YieldShares</div>
                <div className="fc-sub">ys-NVDA vault</div>
              </div>
            </div>
            <div className="fc-body">
              <div className="fc-sym">ys-NVDA</div>
              <div className="fc-amt">Liquid · <span className="up">earning fees</span></div>
            </div>
            <button className="fc-btn" suppressHydrationWarning onClick={() => setDepositOpen(true)}>Deposit</button>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="strip">
        <div className="wrap strip-inner">
          <div className="strip-item"><b>ERC-4626</b> vault accounting</div>
          <div className="strip-dot" />
          <div className="strip-item"><b>Tradeable</b> share token</div>
          <div className="strip-dot" />
          <div className="strip-item"><b>No</b> lockup</div>
          <div className="strip-dot" />
          <div className="strip-item"><b>Live</b> market prices</div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">The problem</span>
            <h2>Liquidity without <em>giving up</em> yield</h2>
            <p className="sec-lead">A liquidity position earns fees, but it sits still. Everything you might want to do with that capital means closing it first.</p>
          </div>

          <div className="ba">
            <div className="ba-card">
              <span className="ba-tag">Before</span>
              <h3>A position you can only sit on</h3>
              <ul className="ba-list">
                <li>
                  <svg className="x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  The position is bound to one pool and one range.
                </li>
                <li>
                  <svg className="x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  Moving or selling it means unwinding it first.
                </li>
                <li>
                  <svg className="x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  Nothing else in DeFi knows what the position is worth.
                </li>
                <li>
                  <svg className="x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  Fees pile up inside the position instead of becoming an asset.
                </li>
              </ul>
            </div>

            <div className="ba-card after">
              <span className="ba-tag">After</span>
              <h3>A share token that keeps earning</h3>
              <ul className="ba-list">
                <li>
                  <svg className="v-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5"/></svg>
                  Deposit once, hold a fungible ERC-20 that any wallet understands.
                </li>
                <li>
                  <svg className="v-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5"/></svg>
                  Send it, sell it or post it as collateral without touching the pool.
                </li>
                <li>
                  <svg className="v-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5"/></svg>
                  Harvested fees raise the share price, so yield follows the token.
                </li>
                <li>
                  <svg className="v-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5"/></svg>
                  Redeem for the underlying at any time, at the on-chain price.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE FEATURES ===== */}
      <section className="section section-alt" id="yieldshares">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Core features</span>
            <h2>Three rails for <em>private, composable</em> markets</h2>
            <p className="sec-lead">YieldShares, direct liquidity provision, and private execution for crypto and tokenized real-world assets.</p>
          </div>

          <div className="feat">
            <article>
              <div className="feat-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>
              </div>
              <h3>YieldShares</h3>
              <p>Deposit into a vault, receive an ERC-20 that represents your slice of the pool. Fee income harvested into the vault raises its redemption value.</p>
              <ul>
                <li>ERC-4626 accounting, verifiable on chain</li>
                <li>Share price read from the contract, not a feed</li>
                <li>Transferable, so yield follows the holder</li>
              </ul>
            </article>

            <article>
              <div className="feat-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/><circle cx="8" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="10" cy="18" r="2" fill="currentColor" stroke="none"/></svg>
              </div>
              <h3>Liquidity provision</h3>
              <p>Provide into a supported pool directly and earn the trading fee, split across three tiers depending on how volatile the pair is.</p>
              <ul>
                <li>Fee tiers: 0.05%, 0.3%, 1.0%</li>
                <li>Protocol cut capped in the contract</li>
                <li>Withdraw the underlying at any block</li>
              </ul>
            </article>

            <article>
              <div className="feat-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
              </div>
              <h3>Private execution</h3>
              <p>Orders are expressed as intents and filled by solvers, so the trade is not sitting in a public mempool for a bot to read and front-run.</p>
              <ul>
                <li>Intent-based routing, not a raw swap call</li>
                <li>Liquidity aggregated across venues</li>
                <li>Gas abstraction, fees paid in the traded asset</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ===== PLATFORM OVERVIEW ===== */}
      <section className="section" id="overview">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Platform overview</span>
            <h2>From vault deposit to <em>hook-powered</em> YieldShares</h2>
            <p className="sec-lead">Four contracts, one path. Every step is a call you can read on the explorer.</p>
          </div>

          <div className="pipe">
            <div className="pipe-step">
              <span className="pipe-n">01</span>
              <b>Deposit</b>
              <p>You send the pool asset to the vault. It is accounted explicitly, so a stray transfer cannot move the share price.</p>
            </div>
            <div className="pipe-step">
              <span className="pipe-n">02</span>
              <b>Mint</b>
              <p>The vault mints YieldShares at the current price. The first deposit is 1:1; later ones pay whatever the shares are already worth.</p>
            </div>
            <div className="pipe-step">
              <span className="pipe-n">03</span>
              <b>Harvest</b>
              <p>The hook pushes collected swap fees into the vault. The protocol cut goes to the treasury, the rest raises every share.</p>
            </div>
            <div className="pipe-step">
              <span className="pipe-n">04</span>
              <b>Redeem</b>
              <p>Burn shares, get the underlying back at the current price. No lockup, no queue, no epoch.</p>
            </div>
          </div>

          <div className="stats">
            {stats.map(s => (
              <div className="stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRIVATE TRADING ===== */}
      <section className="section section-alt" id="trading">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Private trading</span>
            <h2>Crypto and tokenized stocks, <em>one liquidity layer</em></h2>
            <p className="sec-lead">The real tokenized assets on Robinhood Chain, equities and metals. Prices come from the market, refreshed on load.</p>
          </div>

          <div className="stock-grid">
            {assets.map(a => (
              <div className="stock" key={a.ticker}>
                <div className="stock-logo">{a.ticker.slice(0,3)}</div>
                <div className="stock-info">
                  <span className="stock-t">{a.ticker}</span>
                  <span className="stock-n">{a.name}</span>
                </div>
                <div className="stock-p">
                  {a.price}
                  <span className={`stock-ch ${a.up ? 'ch-up' : 'down'}`}>{a.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section" id="how">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Provide liquidity. <em>Keep it liquid.</em></h2>
            <p className="sec-lead">Three steps, and the share token is yours from the first block.</p>
          </div>

          <div className="steps">
            <article className="step">
              <div className="step-n">STEP 01</div>
              <h3>Connect and deposit</h3>
              <p>Connect a wallet on Robinhood Chain, approve the asset once, and deposit into a listed vault.</p>
            </article>
            <article className="step">
              <div className="step-n">STEP 02</div>
              <h3>Hold YieldShares</h3>
              <p>You get an ERC-20 back. It shows up in your wallet, transfers like any token, and gains value as fees are harvested.</p>
            </article>
            <article className="step">
              <div className="step-n">STEP 03</div>
              <h3>Redeem when you want</h3>
              <p>Burn the shares for the underlying at the current on-chain price. Principal and accrued yield come back together.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== SECURITY ===== */}
      <section className="section section-alt" id="security">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Security</span>
            <h2>What the contract <em>actually guarantees</em></h2>
            <p className="sec-lead">Four properties, each covered by a test in the repo rather than a badge on a page.</p>
          </div>

          <div className="sec-grid">
            <div className="sec-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.4 8.8 8 10 4.6-1.2 8-5 8-10V6l-8-4Z"/></svg>
              <b>No inflation attack</b>
              <p>A virtual share and unaccounted donations mean a first depositor cannot round the next one down to zero shares.</p>
            </div>
            <div className="sec-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M12 3v18"/><circle cx="12" cy="12" r="9"/></svg>
              <b>Donations do not reprice</b>
              <p>Assets are tracked in storage, not read from the balance. Sending tokens to the vault changes nothing for holders.</p>
            </div>
            <div className="sec-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>
              <b>Fee is capped in code</b>
              <p>The protocol cut cannot be set above the hard cap, by the owner or anyone else. It is a constant in the contract.</p>
            </div>
            <div className="sec-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h6"/><path d="M12 9v6"/><circle cx="12" cy="12" r="9"/></svg>
              <b>Owner cannot take principal</b>
              <p>The sweep function can only move assets above what shareholders are owed. The backing is untouchable.</p>
            </div>
          </div>

          <p className="sec-note">Each property above has a test behind it in the repo. The contracts have not been through a third-party audit.</p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" id="faq">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">FAQ</span>
            <h2>The short answers</h2>
          </div>

          <div className="faq">
            <details open>
              <summary>What is a YieldShare?</summary>
              <p>An ERC-20 that represents a claim on a vault holding a pool asset. One share is worth <code>totalAssets / totalSupply</code> of the underlying, and that number only goes up as fee income is harvested in. It is an ordinary token, so your wallet, a DEX, or a lending market can all handle it without special support.</p>
            </details>
            <details>
              <summary>How does the yield actually reach me?</summary>
              <p>It does not arrive as a separate reward you claim. Harvested fees are added to the vault&apos;s assets while the share supply stays the same, so each share redeems for more than it did before. If you sell the share, the accrued yield goes with it, priced in.</p>
            </details>
            <details>
              <summary>Can I lose money?</summary>
              <p>Yes. You still hold the pool&apos;s underlying exposure, including impermanent loss on the position and the price risk of the asset itself. YieldShares change the liquidity of the position, not its risk.</p>
            </details>
            <details>
              <summary>What does &quot;private execution&quot; mean here?</summary>
              <p>Instead of broadcasting a swap that anyone can see and sandwich, you sign an intent describing the outcome you want. A solver competes to fill it and submits the transaction, so your order is not readable in the public mempool before it settles. Vaults ship first; routing follows.</p>
            </details>
            <details>
              <summary>Is there a lockup?</summary>
              <p>No. Redeem any block. There is no epoch, no queue and no withdrawal delay in the contract.</p>
            </details>
            <details>
              <summary>What is deployed right now?</summary>
              <p><b>16 vaults</b> are live on Robinhood Chain mainnet: 15 from the factory at 0xee57…D199, plus a routed USDG vault that forwards deposits into Morpho. An earlier USDG vault is retired; it still redeems and the app lists it as retired. Every figure in the app is read from those contracts at load. Two different fees apply: the factory vaults take <b>10% of harvested fee income</b>, capped at 20% in the contract, and the routed USDG vault takes <b>2% of the gain</b>. Neither ever touches principal. The contracts have not been audited.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="wrap foot-inner">
          <div className="foot-brand">
            <div className="row">
              <img src="/logo.png" alt="Zelp Logo" className="brand-mark" style={{ padding: 0, objectFit: 'cover' }} />
              <span className="brand-name">Zelp</span>
            </div>
            <p>Liquid yield and private markets on Robinhood Chain. Deposit a pool asset, hold a tradeable ERC-20, redeem any block.</p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>Product</h4>
              <a href="#">App</a>
              <a href="#yieldshares">YieldShares</a>
              <a href="#trading">Private trading</a>
            </div>
            <div className="foot-col">
              <h4>Learn</h4>
              <a href="/docs">Docs</a>
              <a href="#how">How it works</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="foot-col">
              <h4>Protocol</h4>
              <a href="#security">Security</a>
              <a href="#overview">Overview</a>
              <a href="#">X</a>
              <a href="#">Discord</a>
            </div>
          </div>
        </div>
        <div className="wrap foot-bottom">
          <span>© 2026 Zelp. Experimental software. Not investment advice.</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>CA: Not launched</span>
        </div>
      </footer>

      {/* ===== DEPOSIT MODAL ===== */}
      {depositOpen && (
        <div className="modal-overlay" onClick={() => setDepositOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" suppressHydrationWarning onClick={() => setDepositOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>

            {depositDone ? (
              <div className="modal-success">
                <div className="modal-success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5"/></svg>
                </div>
                <h3>Deposit confirmed</h3>
                <p style={{ textAlign: 'center', marginTop: 8 }}>YieldShares minted to your wallet.</p>
              </div>
            ) : (
              <form onSubmit={handleDeposit}>
                <h3>Deposit into ys-NVDA</h3>
                <p>Enter the amount of NVDA to deposit into the vault and receive YieldShares.</p>

                <div className="modal-field">
                  <label htmlFor="depositAmt">Amount (NVDA)</label>
                  <input
                    id="depositAmt"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="0.00"
                    value={depositAmt}
                    onChange={e => setDepositAmt(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="modal-kv">
                  <div>
                    <dt>You receive</dt>
                    <dd>{depositAmt ? (parseFloat(depositAmt) / 1.042).toFixed(4) : '—'} ys-NVDA</dd>
                  </div>
                  <div>
                    <dt>Share price</dt>
                    <dd>1.042 NVDA / ys-NVDA</dd>
                  </div>
                  <div>
                    <dt>Protocol fee</dt>
                    <dd>10% of harvested fees only</dd>
                  </div>
                  <div>
                    <dt>Lockup</dt>
                    <dd>0 blocks</dd>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 20px' }} suppressHydrationWarning>
                  Deposit →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
