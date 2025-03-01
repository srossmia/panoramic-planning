// /src/data/servicesData.ts

export interface Services {
  icon: string;
  header: string;
  description: string;
  content: string[];
  link: string;
}

export const servicesData: Services[] = [
  {
    icon: '/icons/financial-planning-icon.png',
    header: 'Financial Planning',
    description:
      'Our goals-based approach lays out a clear path for your financial journey. From retirement to education funding and life’s major purchases, we rely on industry-leading planning software to link all your accounts in one place. We continually refine your plan, ensuring it evolves with your needs.',
    content: [
      'Take stock of current assets and account types',
      'Link accounts in one location with industry-leading planning software',
      'Create timeframes and goalposts for retirement, education, and other goals',
      'Develop and update financial plans as often as you see fit',
      'Comprehensive retirement planning',
      'Education funding strategies',
      'Major life purchase planning',
    ],
    link: '/services#financial-planning',
  },
  {
    icon: '/icons/investment-management-icon.png',
    header: 'Portfolio Construction',
    description:
      'We tailor investment strategies that reflect your unique risk tolerance, crafting diversified portfolios anchored in efficient ETFs. With quarterly rebalancing guided by Morningstar’s analytics and access to tax-loss harvesting, SMAs, and private market opportunities, we keep your portfolio on course for long-term growth.',
    content: [
      'Create individual and family risk assessments and investor profiles',
      'Customize diversified portfolios composed primarily of efficient ETFs',
      'Portfolio diversification aligned with your personal objectives',
      'Risk management strategies tailored to your goals',
      'Rebalance portfolios quarterly, using Morningstar for qualitative and quantitative screening',
      'Ongoing portfolio adjustments to remain aligned with changing markets',
      'Access to specialty services and assets: tax-loss harvesting, SMAs, and private markets',
    ],
    link: '/services#investment-management',
  },
  {
    icon: '/icons/legacy-development-icon.png',
    header: 'Legacy Management',
    description:
      'We help ensure your legacy endures through thoughtful estate planning, updated beneficiaries, and the right charitable giving options. By considering insurance needs, coordinating with estate planners, and supporting multi-generational financial questions, we pave the way for a lasting impact that reflects your values.',
    content: [
      'Estate planning strategies guided by your vision',
      'Ensure beneficiaries are current and accurately designated',
      'Charitable giving options aligned with your philanthropic interests',
      'Consider life, disability, and long-term care needs',
      'Heir preparation and wealth transfer to sustain your legacy',
      'Quarterback estate planning with high-level will and trust partnerships',
      'Support multi-generational financial and high-level tax questions',
    ],
    link: '/services#legacy-development',
  },
];
