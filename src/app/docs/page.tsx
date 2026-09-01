"use client";
import React, { useEffect } from 'react';
import BackgroundVideo from '@/components/BackgroundVideo';
import Link from 'next/link';

export default function DocsPage() {
  useEffect(() => {
    // Intersection Observer for scroll spy on the docs nav
    const links = Array.from(document.querySelectorAll(".docs-nav a")) as HTMLAnchorElement[];
    const heads = links.map((a) => {
      const hash = a.getAttribute('href')?.slice(1);
      return hash ? document.getElementById(hash) : null;
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = heads.indexOf(e.target as HTMLElement);
        links.forEach((a, j) => {
          a.classList.toggle("active", i === j);
        });
      });
    }, { rootMargin: "-92px 0px -70% 0px" });

    heads.forEach((h) => {
      if (h) io.observe(h);
    });

    return () => io.disconnect();
  }, []);

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
            <Link href="/#faq">FAQ</Link>
          </nav>

          <div className="nav-cta">
            <a className="nav-x" href="#" aria-label="Zelp on Discord" title="Zelp on Discord" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M19.27 5.33A16.5 16.5 0 0 0 15.2 4.1a.06.06 0 0 0-.07.03c-.18.32-.38.73-.52 1.06a15.3 15.3 0 0 0-4.6 0 10.6 10.6 0 0 0-.53-1.06.06.06 0 0 0-.07-.03A16.5 16.5 0 0 0 5.33 5.33a.06.06 0 0 0-.03.02C2.7 9.24 2 13.03 2.34 16.77c0 .02.01.04.03.05a16.6 16.6 0 0 0 5 2.53.06.06 0 0 0 .07-.02c.39-.53.73-1.09 1.02-1.68a.06.06 0 0 0-.03-.08 11 11 0 0 1-1.56-.74.06.06 0 0 1 0-.1l.31-.24a.06.06 0 0 1 .06 0 11.8 11.8 0 0 0 10.03 0 .06.06 0 0 1 .06 0l.31.25a.06.06 0 0 1 0 .1c-.5.29-1.02.53-1.56.74a.06.06 0 0 0-.03.08c.3.59.64 1.15 1.02 1.68a.06.06 0 0 0 .07.02 16.5 16.5 0 0 0 5-2.53.06.06 0 0 0 .03-.05c.4-4.32-.67-8.08-2.86-11.42a.05.05 0 0 0-.03-.02ZM8.89 14.49c-.98 0-1.79-.9-1.79-2.01s.8-2.02 1.8-2.02c1 0 1.8.91 1.79 2.02 0 1.1-.8 2.01-1.8 2.01Zm6.24 0c-.98 0-1.79-.9-1.79-2.01s.79-2.02 1.79-2.02 1.8.91 1.79 2.02c0 1.1-.79 2.01-1.79 2.01Z"/></svg>
            </a>
            <a className="nav-x" href="#" aria-label="Zelp on X" title="Zelp on X" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25h6.816l4.713 6.231 5.461-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>
            </a>
            <Link className="btn btn-primary btn-badge" href="/">Open app <span className="arrow" aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>
      </header>

      {/* ===== DOCS ===== */}
      <main className="docs wrap" style={{ display: 'flex', gap: '64px', alignItems: 'flex-start', marginTop: '48px', paddingBottom: '120px' }}>
        <aside className="docs-nav" aria-label="On this page" style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px' }}>
          <h5 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-3)', fontWeight: 600, marginBottom: '8px' }}>On this page</h5>
          <a href="#yieldshares" style={{ fontSize: '14.5px', color: 'var(--ink-2)' }}>YieldShares</a>
          <a href="#what-the-contract-guarantees" style={{ fontSize: '14.5px', color: 'var(--ink-2)' }}>What the contract guarantees</a>
          <a href="#what-it-does-not-guarantee" style={{ fontSize: '14.5px', color: 'var(--ink-2)' }}>What it does not guarantee</a>
          <a href="#private-execution" style={{ fontSize: '14.5px', color: 'var(--ink-2)' }}>Private execution</a>
          <a href="#contracts" style={{ fontSize: '14.5px', color: 'var(--ink-2)' }}>Contracts</a>
          <a href="#parameters" style={{ fontSize: '14.5px', color: 'var(--ink-2)' }}>Parameters</a>
          <a href="#running-it-yourself" style={{ fontSize: '14.5px', color: 'var(--ink-2)' }}>Running it yourself</a>
          <a href="#front-end" style={{ fontSize: '14.5px', color: 'var(--ink-2)' }}>Front end</a>
        </aside>

        <article className="doc" style={{ flex: 1, maxWidth: '720px', background: 'var(--surface)', backdropFilter: 'var(--surface-blur)', borderRadius: 'var(--r)', padding: '48px 56px' }}>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: '42px', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '24px' }}>Docs</h1>
          <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '24px' }}>
            What the protocol does, what the contracts guarantee, and what is actually deployed. Written to be checkable against the code, not to sell anything.
          </p>

          <div className="notice" style={{ margin: '26px 0', padding: '20px', background: 'var(--green-soft)', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--green-deep)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px', flexShrink: 0, marginTop: '2px' }}><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>
            <span style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5 }}><b>Status.</b> 16 vaults are live on Robinhood Chain mainnet: 15 deployed by the factory, plus a routed USDG vault that forwards deposits into Morpho Blue. An earlier USDG vault is retired: it still redeems and the app still lists it, marked, but it is not somewhere to deposit. The app reads all of them directly. The contracts pass a full test suite but have not been through a third-party audit. Private routing is designed and not yet shipped; vaults came first.</span>
          </div>

          <h2 id="yieldshares" style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, marginTop: '48px', marginBottom: '16px' }}>YieldShares</h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>A vault holds one asset. You deposit that asset and the vault mints you a share token. The share token is an ordinary ERC-20: it has a symbol, it shows in your wallet, and it transfers without the protocol's permission.</p>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>The share price is:</p>
          <pre style={{ background: 'rgba(22,35,26,.05)', padding: '16px', borderRadius: '8px', fontFamily: 'var(--mono)', fontSize: '14px', marginBottom: '24px' }}><code>pricePerShare = (totalAssets + 1) / (totalSupply + 1)</code></pre>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>The <code>+ 1</code> on each side is a virtual asset and a virtual share. It exists so that the very first deposit cannot be used to manipulate the price for the second one. Without it, an attacker deposits 1 wei, donates a large amount to the vault, and the next depositor's shares round down to zero.</p>

          <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '32px', marginBottom: '12px' }}>Yield</h3>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>Fee income is pushed into the vault by the harvester (in production, the pool hook that collects swap fees). The vault takes the protocol's cut, adds the rest to <code>totalAssets</code>, and mints no new shares. The supply is unchanged and the assets grew, so every share is now worth more.</p>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>There is nothing to claim. If you transfer the share, the accrued yield transfers with it, because it lives in the redemption price rather than in a per-user reward balance.</p>

          <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '32px', marginBottom: '12px' }}>Redemption</h3>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>Burn shares, receive the underlying at the current price. No lockup, no queue, no epoch. Rounding on withdrawals and mints always goes in the vault's favour, by at most a few wei, so a sequence of deposits and redemptions cannot drain other holders.</p>

          <h2 id="what-the-contract-guarantees" style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, marginTop: '48px', marginBottom: '16px' }}>What the contract guarantees</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', marginBottom: '24px', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px', color: 'var(--ink)' }}>Property</th>
                <th style={{ padding: '12px 8px', color: 'var(--ink)' }}>How it is enforced</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>A donation cannot move the share price</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}><code>totalAssets</code> is a storage variable, not <code>balanceOf(this)</code>. Raw transfers into the vault are invisible to pricing.</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>The first depositor cannot round out the second</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Virtual asset and virtual share in every conversion.</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>The protocol fee has a ceiling</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}><code>MAX_FEE_BPS</code> is a constant checked in the constructor and in <code>setFee</code>. The owner cannot exceed it.</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>The owner cannot take shareholders' assets</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}><code>skim</code> can only move the balance above <code>totalAssets</code>. The backing is out of reach.</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Only the harvester can add yield</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}><code>harvest</code> checks <code>msg.sender == harvester</code> and pulls the tokens from the caller.</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Fee-on-transfer assets are rejected</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Deposits verify the received amount matches the requested amount, and revert otherwise.</td></tr>
            </tbody>
          </table>

          <h2 id="what-it-does-not-guarantee" style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, marginTop: '48px', marginBottom: '16px' }}>What it does not guarantee</h2>
          <ul style={{ paddingLeft: '24px', margin: '16px 0 24px', fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, display: 'grid', gap: '8px' }}>
            <li>It does not protect you from the underlying position's risk. Impermanent loss and price risk are unchanged.</li>
            <li>It does not make yield a certainty. If no fees are harvested, the share price does not move.</li>
            <li>It has not been audited. The tests cover the properties above, but tests are not a review.</li>
            <li>The vaults are new and start empty. Being on chain is not the same as being battle-tested.</li>
            <li>The owner controls the harvester address and the fee within the cap. That is a trust assumption until ownership moves to a timelock.</li>
          </ul>

          <h2 id="private-execution" style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, marginTop: '48px', marginBottom: '16px' }}>Private execution</h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>The intended design: you sign an intent describing the outcome you want rather than a swap call. Solvers compete to fill it and one of them submits the transaction. Your order is never a pending transaction anyone can read and sandwich, and because the solver pays gas, the fee can be settled in the traded asset.</p>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>Vaults shipped first. Routing is designed and not yet live, and the app does not offer it.</p>

          <h2 id="contracts" style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, marginTop: '48px', marginBottom: '16px' }}>Contracts</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', marginBottom: '24px', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px', color: 'var(--ink)' }}>Contract</th>
                <th style={{ padding: '12px 8px', color: 'var(--ink)' }}>Purpose</th>
                <th style={{ padding: '12px 8px', color: 'var(--ink)' }}>Address</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)', fontFamily: 'var(--mono)' }}>VaultFactory</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Deploys and registers vaults. The app's entire market list is one read against this.</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)', fontFamily: 'var(--mono)' }}>not deployed</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)', fontFamily: 'var(--mono)' }}>YieldShares</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>One per asset. ERC-4626 accounting with an ERC-20 share token.</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)', fontFamily: 'var(--mono)' }}>16 live, listed in the app</td></tr>
            </tbody>
          </table>

          <h2 id="parameters" style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, marginTop: '48px', marginBottom: '16px' }}>Parameters</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', marginBottom: '24px', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px', color: 'var(--ink)' }}>Parameter</th>
                <th style={{ padding: '12px 8px', color: 'var(--ink)' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Factory vaults: cut of harvested fee income</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>10% of harvested income</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Routed USDG vault: cut of the gain</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>2% of yield only, never principal</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Can either fee touch your deposit?</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>No. Both apply to earnings only.</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Can withdrawals be paused or blocked?</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>No. There is no pause function and no owner check on <code>withdraw</code> or <code>redeem</code>.</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Hard cap on that cut</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>20%, enforced in the contract</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Pool fee tiers</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>0.01% / 0.05% / 0.3% / 1%</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Chain</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Robinhood Chain (chainId 4663)</td></tr>
              <tr style={{ borderBottom: '1px solid var(--line-2)' }}><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>Withdrawal delay</td><td style={{ padding: '12px 8px', color: 'var(--ink-2)' }}>none</td></tr>
            </tbody>
          </table>

          <h2 id="running-it-yourself" style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, marginTop: '48px', marginBottom: '16px' }}>Running it yourself</h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>Tests:</p>
          <pre style={{ background: 'rgba(22,35,26,.05)', padding: '16px', borderRadius: '8px', fontFamily: 'var(--mono)', fontSize: '14px', marginBottom: '24px' }}><code>forge test</code></pre>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>Deploy the factory, then create a vault per asset:</p>
          <pre style={{ background: 'rgba(22,35,26,.05)', padding: '16px', borderRadius: '8px', fontFamily: 'var(--mono)', fontSize: '14px', marginBottom: '24px', whiteSpace: 'pre-wrap' }}><code>forge create contracts/VaultFactory.sol:VaultFactory \
  --rpc-url $RPC --private-key $KEY \
  --constructor-args 1000 $TREASURY

cast send $FACTORY "createVault(address,string,string)" \
  $ASSET "YieldShares NVDA" "ys-NVDA" \
  --rpc-url $RPC --private-key $KEY</code></pre>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>The market list is read entirely from the registry at <code>vaults.factory</code>, so a new vault appears without a deploy. <code>config.js</code> additionally holds the vaults deployed outside the factory (the routed one and the retired one), the stablecoin, the zap, the Uniswap v3 factory and the tokenized-asset list. <code>api/vaults.js</code> carries the factory and routed addresses a second time because a serverless function cannot import a file that assigns a browser global; <code>check.mjs</code> fails the build if the two copies drift.</p>

          <h2 id="front-end" style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, marginTop: '48px', marginBottom: '16px' }}>Front end</h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>Static HTML, CSS and vanilla JavaScript. <code>config.js</code> is the only source of truth for the brand, the chain and the addresses. There are four serverless functions: <code>/api/vaults</code> (the whole vault list, read server-side and cached), <code>/api/rpc</code> (a JSON-RPC proxy with node failover), <code>/api/health</code> (a real chain read, for uptime checks) and <code>/api/prices</code>, which proxies public stock quotes; a symbol with no quote is omitted rather than filled with a placeholder.</p>
        </article>
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
