import Link from "next/link";
import { Section } from "@/common/layout";

export function LGBTQDiscountBanner() {
  return (
    <Section className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl text-center">
        <div className="relative rounded-3xl border border-white/5 bg-white/5 p-12 backdrop-blur-md">
          
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-sm">
              <span className="text-lg">🏳️‍🌈</span>
              <span>Supporting LGBTQ+ Entrepreneurs</span>
            </div>
            
            <h2 className="mt-6 text-balance text-4xl font-bold text-white sm:text-5xl">
              25% Off for LGBTQ+ Businesses
            </h2>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Starting a business as a minority is hard as hell. I know—I&rsquo;ve been there. 
              That&rsquo;s why LGBTQ-owned businesses get <strong className="text-white">25% off</strong>. 
              No hoops, no fine print. Just mention it when you reach out.
            </p>
            
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact?subject=25%25%20LGBTQ%2B%20Discount"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-[1.02] lgbtq-rainbow-button"
              >
                {/* Animated rainbow border ring */}
                <span className="absolute inset-0 rounded-full lgbtq-rainbow-ring"></span>
                
                {/* White button background */}
                <span className="absolute inset-[3px] rounded-full bg-white"></span>
                
                {/* Button content with gradient text */}
                <span className="relative z-10 flex items-center bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Claim Your 25% Discount
                  <svg 
                    className="ml-2 h-5 w-5 text-purple-600 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
