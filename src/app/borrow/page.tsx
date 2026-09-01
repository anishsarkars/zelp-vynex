"use client";
import React, { useState } from 'react';
import BackgroundVideo from '@/components/BackgroundVideo';
import Link from 'next/link';

export default function BorrowPage() {
  const [activeTab, setActiveTab] = useState<'borrow' | 'lend'>('borrow');

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

            <a className="nav-x" href="https://x.com/tryzelp" aria-label="Zelp on X" title="Zelp on X" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25h6.816l4.713 6.231 5.461-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>
            </a>
            <button className="btn btn-primary">Connect wallet</button>
          </div>
        </div>
      </header>

      {/* ===== APP MAIN ===== */}
      <main className="app-main" id="borrowMain" style={{ paddingTop: '56px', paddingBottom: '120px' }}>
        <div className="wrap">
          <div className="app-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div style={{ maxWidth: '640px' }}>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: '42px', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '16px' }}>Borrow</h1>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>Post a tokenised stock and draw dollars against it without selling. Pay it back whenever you like and the stock was yours the whole time.</p>
              <p className="app-hint" style={{ fontSize: '13.5px', color: 'var(--ink-3)', lineHeight: 1.5, padding: '16px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px', border: '1px solid var(--line-2)' }}>The position sits on <b>Morpho Blue</b> under <b>your own address</b>, not ours. If this site disappeared tomorrow your position would still be there and you could manage it directly on Morpho.</p>
            </div>
            <div className="right">
              <span className="pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.72)', borderRadius: '999px', padding: '7px 15px', fontSize: '13.5px', fontWeight: 500, color: 'var(--ink-2)', backdropFilter: 'var(--blur)' }}>
                <span className="dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 3px rgba(62,122,75,.22)' }} /> 
                <b>Robinhood Chain</b>
              </span>
            </div>
          </div>

          <div className="app-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* your position */}
            <section className="panel" style={{ background: 'var(--surface)', backdropFilter: 'var(--surface-blur)', borderRadius: 'var(--r)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
              <div className="panel-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <h2 id="mktName" style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 400 }}>Market</h2>
                <span className="sub" id="marketUtil" style={{ fontSize: '13px', color: 'var(--ink-3)' }}></span>
              </div>
              <div className="panel-body">
                <p className="mode-explain" id="mktSub" style={{ fontSize: '14.5px', color: 'var(--ink-2)', marginBottom: '24px' }}></p>

                <dl className="kv" style={{ display: 'grid', gap: '12px', background: 'var(--paper)', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Your collateral</dt><dd id="posCollateral" style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 600 }}>—</dd></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt style={{ fontSize: '14px', color: 'var(--ink-2)' }}>You owe</dt><dd id="posDebt" style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 600 }}>—</dd></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--line-2)' }}><dt style={{ fontSize: '14px', fontWeight: 600 }}>Still available to you</dt><dd id="posRoom" style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 600, color: 'var(--green)' }}>—</dd></div>
                </dl>

                <div className="health">
                  <div className="health-track" style={{ height: '6px', background: 'var(--line-2)', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div className="health-fill" id="healthBar" style={{ width: '0%', height: '100%', background: 'var(--green)' }}></div>
                  </div>
                  <span className="hint" id="healthPct" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Connect a wallet to see your position.</span>
                </div>

                <p className="hint" style={{ marginTop: '24px', fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.5 }}>
                  Borrow too much against a stock that then falls and the position gets liquidated by
                  somebody else, at a discount, automatically. Leaving room is the whole game.
                </p>
              </div>
            </section>

            {/* act */}
            <section className="panel" id="tradePanel" style={{ background: 'var(--surface)', backdropFilter: 'var(--surface-blur)', borderRadius: 'var(--r)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
              <div className="panel-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 400 }}>Act</h2>
                <span className="sub">
                  <span className="tabs" style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.5)', padding: '4px', borderRadius: '999px' }}>
                    <button onClick={() => setActiveTab('borrow')} className={`btn ${activeTab === 'borrow' ? 'btn-primary' : ''}`} style={{ padding: '6px 16px', fontSize: '13.5px', background: activeTab === 'borrow' ? '' : 'transparent', color: activeTab === 'borrow' ? '' : 'var(--ink-2)' }}>Borrow</button>
                    <button onClick={() => setActiveTab('lend')} className={`btn ${activeTab === 'lend' ? 'btn-primary' : ''}`} style={{ padding: '6px 16px', fontSize: '13.5px', background: activeTab === 'lend' ? '' : 'transparent', color: activeTab === 'lend' ? '' : 'var(--ink-2)' }}>Lend</button>
                  </span>
                </span>
              </div>
              <div className="panel-body">

                {activeTab === 'borrow' ? (
                  <div id="panelBorrow" className="animate-in fade-in duration-300">
                    <div className="field" style={{ marginBottom: '16px' }}>
                      <label htmlFor="collInput" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, marginBottom: '8px' }}>Collateral to post</label>
                      <input id="collInput" type="text" inputMode="decimal" placeholder="0.0" autoComplete="off" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--mono)', fontSize: '16px' }} />
                    </div>
                    <div className="field" style={{ marginBottom: '24px' }}>
                      <label htmlFor="borrowInput" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, marginBottom: '8px' }}>Dollars to borrow</label>
                      <input id="borrowInput" type="text" inputMode="decimal" placeholder="0.0" autoComplete="off" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--mono)', fontSize: '16px' }} />
                      <span className="hint" style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink-3)', marginTop: '8px' }}>Leave either box empty to only do the other one.</span>
                    </div>
                    <button className="btn btn-primary btn-lg" id="borrowBtn" style={{ width: '100%', padding: '16px' }}>Post and borrow</button>

                    <div className="field" style={{ marginTop: '32px', marginBottom: '16px' }}>
                      <label htmlFor="repayInput" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, marginBottom: '8px' }}>Repay</label>
                      <input id="repayInput" type="text" inputMode="decimal" placeholder="0.0" autoComplete="off" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--mono)', fontSize: '16px' }} />
                      <span className="hint" style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink-3)', marginTop: '8px' }}>Pay more than you owe and the surplus comes straight back.</span>
                    </div>
                    <button className="btn" id="repayBtn" style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.8)', border: '1px solid var(--line-2)' }}>Repay</button>
                    <button className="btn" id="closeBtn" style={{ width: '100%', marginTop: '8px', padding: '14px', background: 'transparent', color: 'var(--down)' }}>Clear the debt and take my stock back</button>
                  </div>
                ) : (
                  <div id="panelLend" className="animate-in fade-in duration-300">
                    <p className="mode-explain" style={{ fontSize: '14.5px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '24px' }}>
                      Supply dollars for borrowers to draw on, and earn the interest they pay.
                      This goes straight to Morpho, so the money never passes through anything we wrote.
                    </p>
                    <div className="field" style={{ marginBottom: '24px' }}>
                      <label htmlFor="supplyInput" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, marginBottom: '8px' }}>Dollars to supply</label>
                      <input id="supplyInput" type="text" inputMode="decimal" placeholder="0.0" autoComplete="off" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.8)', fontFamily: 'var(--mono)', fontSize: '16px' }} />
                      <span className="hint" style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink-3)', marginTop: '8px' }}>It only earns while somebody is borrowing against it.</span>
                    </div>
                    <button className="btn btn-primary btn-lg" id="supplyBtn" style={{ width: '100%', padding: '16px' }}>Supply</button>
                    <button className="btn" id="withdrawSupplyBtn" style={{ width: '100%', marginTop: '8px', padding: '14px', background: 'rgba(255,255,255,0.8)', border: '1px solid var(--line-2)' }}>Withdraw everything I supplied</button>
                  </div>
                )}

                <div className="status" id="status"></div>
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
