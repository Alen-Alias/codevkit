import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, Lock, ArrowRight, Clock } from 'lucide-react';
import { plugins, CATEGORIES, CATEGORY_LABELS } from '@/lib/plugin-registry';
import { useCommandPalette } from '@/contexts/command-palette-context';
import { useRecents } from '@/contexts/recents-context';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { staggerContainer, fadeInUp, fadeInScale, cardHover, cardTap } from '@/lib/animation';

const popularTools = ['json-formatter', 'base64', 'hash-generator', 'jwt-decoder', 'regex-tester', 'uuid-generator'];

const faqItems = [
  {
    q: 'Is CodevKit free to use?',
    a: 'Yes, CodevKit is completely free. There\'s no premium tier, no paywalled tools, and no usage limits — every tool in the toolkit is free to use as much as you want.',
  },
  {
    q: 'Do I need to sign up to use CodevKit?',
    a: 'No. CodevKit has no accounts, no login, and no sign-up form. Open any tool and start using it immediately — your favorites, recent tools, and settings are saved locally in your browser instead of tied to an account.',
  },
  {
    q: 'Is CodevKit safe to use with sensitive data?',
    a: 'Yes. CodevKit runs entirely client-side, meaning anything you paste or type — API keys, tokens, JSON payloads — stays on your device and is never sent to a server. You can verify this yourself by checking your browser\'s network tab while using any tool.',
  },
  {
    q: 'Does CodevKit work offline?',
    a: 'Yes, once loaded, CodevKit\'s tools run fully in your browser without needing an internet connection for the actual processing — no data is round-tripped to a server to format JSON, decode a JWT, or generate a hash.',
  },
  {
    q: 'Can I use CodevKit on my phone?',
    a: 'Yes. CodevKit is fully responsive and works on phones, tablets, and desktops alike, so you can format JSON or decode a token from your phone just as easily as from a laptop.',
  },
  {
    q: 'What is a JSON formatter used for?',
    a: 'A JSON formatter takes minified or messy JSON and makes it readable by adding proper indentation and line breaks. It\'s also used to validate JSON syntax and catch errors like missing commas or unclosed brackets before you use the data in your code.',
  },
  {
    q: 'How do I decode a JWT online?',
    a: 'Paste your JSON Web Token into CodevKit\'s JWT decoder, and it instantly breaks the token down into its header, payload, and signature sections, showing you the claims and expiration time without needing to write any code.',
  },
  {
    q: 'Is Base64 encoding secure?',
    a: 'No — Base64 is an encoding scheme, not encryption. It makes binary data safe to transmit as text, but anyone can decode it just as easily as it was encoded. Don\'t rely on Base64 alone to protect sensitive information.',
  },
  {
    q: 'How do I generate a UUID online?',
    a: 'Open CodevKit\'s UUID generator and a new unique identifier is created instantly — no setup required. You can generate multiple UUIDs at once and copy them directly into your code or database.',
  },
  {
    q: 'Does CodevKit store or save my data?',
    a: 'Only what you explicitly want kept, like favorites, recent tools, or settings — and even that stays in your browser\'s local storage, never on a server. Anything you type into a tool itself, like JSON input or text you\'re hashing, is never saved or transmitted anywhere.',
  },
  {
    q: 'How do I use the CodevKit command palette?',
    a: 'Press Ctrl+K (or Cmd+K on Mac) from anywhere in CodevKit to open the command palette. From there you can search for any tool, jump to settings, or switch themes without touching the sidebar or a mouse.',
  },
];

export function HomePage() {
  useDocumentTitle('CodevKit – Free Online Developer Tools, No Ads or Sign-Up');
  const { open } = useCommandPalette();
  const { recents } = useRecents();
  const [, navigate] = useLocation();

  const recentPlugins = recents
    .slice(0, 4)
    .map((id) => plugins.find((p) => p.id === id))
    .filter(Boolean);

  const popularPlugins = popularTools
    .map((slug) => plugins.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="border-b border-border bg-gradient-to-b from-card to-background"
      >
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted border border-border rounded-full px-3 py-1.5 mb-8"
          >
            <Shield className="w-3 h-3 text-primary" />
            Everything runs locally — nothing leaves your browser
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-semibold tracking-tight mb-4"
          >
            CodevKit – Free Online Developer Tools,{' '}
            <span className="text-primary">All in One Place</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto"
          >
            A fast, private, all-in-one developer toolkit — JSON formatter, Base64,
            hashing, JWT, regex, and more. No ads, no tracking, no sign-up.
          </motion.p>

          {/* Search box */}
          <motion.button
            variants={fadeInScale}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={open}
            className="group w-full max-w-lg mx-auto flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-lg text-left text-muted-foreground hover:border-primary/50 hover:bg-card/80 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Search className="w-4 h-4 shrink-0 transition-all duration-200 group-hover:text-primary" />
            <span className="flex-1 transition-all duration-200 group-hover:text-foreground">Search tools...</span>
            <span className="text-xs bg-muted border border-border rounded px-1.5 py-0.5 font-mono transition-all duration-200 group-hover:border-primary/30 group-hover:text-primary">
              ⌘K
            </span>
          </motion.button>

          {/* Feature badges */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-6 mt-8 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              Sub-100ms response
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-primary" />
              Zero data collection
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary" />
              Works offline
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-6 py-10 space-y-16"
      >
        {/* Recent tools */}
        {recentPlugins.length > 0 && (
          <motion.section variants={fadeInUp}>
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Clock className="w-4 h-4 text-muted-foreground" />
              </motion.div>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Recent
              </h2>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {recentPlugins.map((plugin) => {
                if (!plugin) return null;
                const Icon = plugin.icon;
                return (
                  <motion.button
                    key={plugin.id}
                    variants={fadeInScale}
                    whileHover={cardHover}
                    whileTap={cardTap}
                    onClick={() => navigate(`/tools/${plugin.slug}`)}
                    className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg text-left hover:border-primary/50 hover:bg-card/70 transition-colors group"
                  >
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                    </motion.div>
                    <span className="text-sm font-medium truncate">{plugin.name}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.section>
        )}

        {/* What Is CodevKit? */}
        <motion.section variants={fadeInUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">What Is CodevKit?</h2>
          <p className="text-muted-foreground leading-relaxed">
            CodevKit is a <strong>developer toolkit</strong> built for people who use these
            utilities constantly: developers, students, and anyone learning to code. Instead of
            being a single tool, it's an <strong>all in one developer tools</strong> platform —
            every utility lives inside one consistent, fast interface, searchable instantly with a
            single keyboard shortcut. Open CodevKit once, and you have access to a growing library
            of <strong>developer utilities online</strong>, all built to the same quality bar.
          </p>
        </motion.section>

        {/* Why Developers Choose CodevKit */}
        <motion.section variants={fadeInUp} className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight mb-4 text-center">
            Why Developers Choose CodevKit Over Other Online Tools
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4 text-muted-foreground leading-relaxed"
          >
            <motion.p variants={fadeInUp}>
              Most <strong>online coding tools</strong> you'll find through a search engine are
              cluttered with ads, slow to load, and inconsistent — each one designed by a
              different team, with a different layout, different fonts, and different bugs.
              CodevKit was built to fix that. It's one of the few{' '}
              <strong>web developer tools free</strong> platforms where every tool shares the same
              clean design, the same keyboard shortcuts, and the same instant, no-lag feel —
              because they're all part of one connected app instead of a hundred unrelated websites
              stitched together by search results.
            </motion.p>
            <motion.p variants={fadeInUp}>
              It's also genuinely one of the more <strong>privacy first developer tools</strong>{' '}
              available online. Everything runs client-side, directly in your browser. Nothing you
              paste, type, or upload is ever sent to a server, logged, or stored anywhere but your
              own device — making CodevKit a legitimately{' '}
              <strong>secure developer tools online</strong> option for anyone working with
              sensitive data, API keys, or proprietary code snippets they don't want touching a
              third-party server.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Popular Developer Tools */}
        <motion.section variants={fadeInUp}>
          <h2 className="text-2xl font-semibold tracking-tight mb-6 text-center">
            Popular Developer Tools in CodevKit
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {popularPlugins.map((plugin) => {
              if (!plugin) return null;
              const Icon = plugin.icon;
              return (
                <motion.button
                  key={plugin.id}
                  variants={fadeInScale}
                  whileHover={cardHover}
                  whileTap={cardTap}
                  onClick={() => navigate(`/tools/${plugin.slug}`)}
                  className={cn(
                    'flex items-start gap-3 p-4 bg-card border border-border rounded-lg text-left',
                    'hover:border-primary/50 hover:bg-card/70 transition-colors group'
                  )}
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-9 h-9 rounded-md bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{plugin.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {plugin.description}
                    </p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -4 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  </motion.div>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Built for Privacy */}
        <motion.section variants={fadeInUp} className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight mb-4 text-center">
            Built for Privacy — Nothing Ever Leaves Your Browser
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Unlike many free online tools that quietly log what you paste in, CodevKit is
            structurally private: there's no backend, no database, and no analytics tracking what
            you type. You can open your browser's network tab while using any tool in CodevKit and
            see for yourself — no data is ever transmitted anywhere. This makes it one of the more
            trustworthy <strong>offline developer tools</strong> experiences on the web, even
            though it works through a browser rather than a downloaded app.
          </p>
        </motion.section>

        {/* Who Uses CodevKit */}
        <motion.section variants={fadeInUp} className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight mb-4 text-center">Who Uses CodevKit</h2>
          <p className="text-muted-foreground leading-relaxed">
            Students learning to work with JSON and APIs for the first time, professional
            developers who want a faster daily workflow, and anyone tired of hunting for a
            reliable, ad-free version of a simple tool all turn to CodevKit for the same reason:
            it's fast, it's private, and it's actually pleasant to use every day. Bookmark it
            once, and you'll always have the <strong>best online developer tools</strong> ready in
            a single tab — no more digging through five different bookmarked sites just to format a
            JSON blob.
          </p>
        </motion.section>

        {/* FAQ */}
        <motion.section variants={fadeInUp} className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>

        {/* Categories */}
        {CATEGORIES.map((category) => {
          const categoryPlugins = plugins.filter((p) => p.category === category);
          return (
            <motion.section key={category} variants={fadeInUp}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {CATEGORY_LABELS[category]}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {categoryPlugins.length} {categoryPlugins.length === 1 ? 'tool' : 'tools'}
                </span>
              </div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {categoryPlugins.map((plugin) => {
                  const Icon = plugin.icon;
                  return (
                    <motion.button
                      key={plugin.id}
                      variants={fadeInScale}
                      whileHover={cardHover}
                      whileTap={cardTap}
                      onClick={() => navigate(`/tools/${plugin.slug}`)}
                      className={cn(
                        'flex items-start gap-3 p-4 bg-card border border-border rounded-lg text-left',
                        'hover:border-primary/50 hover:bg-card/70 transition-colors group'
                      )}
                    >
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="w-9 h-9 rounded-md bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors"
                      >
                        <Icon className="w-4.5 h-4.5 text-primary" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{plugin.name}</span>
                          {plugin.shortcut && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              className="text-xs text-muted-foreground font-mono bg-muted px-1 py-0.5 rounded"
                            >
                              {plugin.shortcut}
                            </motion.span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {plugin.description}
                        </p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      </motion.div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.section>
          );
        })}
      </motion.div>
    </div>
  );
}
