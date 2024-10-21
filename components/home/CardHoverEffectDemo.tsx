import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
    return (
        <div className="max-w-6xl mx-auto">
            <HoverEffect items={roadmapItems} />
        </div>
    );
}
export const roadmapItems = [
    {
        title: "Winning ETH Denver",
        description:
            "Kickstart our journey by securing victories in ETH Denver's bounties and grants, establishing a strong foundation in the blockchain community and gaining initial funding and recognition.",
        link: "#winning-eth-denver",
    },
    {
        title: "Feature Enhancement",
        description:
            "Expand and enhance our platform's features based on community feedback and technological advancements. This includes refining our AI moderation tools, improving user experience, and integrating with more live streaming platforms.",
        link: "#feature-enhancement",
    },
    {
        title: "Community Building",
        description:
            "Grow our community through active engagement, workshops, and partnerships. Establish a supportive network of content creators, viewers, and tech enthusiasts dedicated to making live streaming safe and enjoyable for everyone.",
        link: "#community-building",
    },
    {
        title: "Beta Launch",
        description:
            "Launch a beta version of our platform to a limited audience for real-world testing. Gather data, feedback, and iterate quickly to prepare for a full-scale public release.",
        link: "#beta-launch",
    },
    {
        title: "Token Launch",
        description:
            "Introduce our platform's token, designed to incentivize content moderation, reward community participation, and facilitate governance. This marks a new era of decentralized decision-making and rewards within our ecosystem.",
        link: "#token-launch",
    },
    {
        title: "Global Expansion",
        description:
            "Expand our platform's reach to new markets and languages, making safe and fun live streaming accessible worldwide. Focus on localization, regulatory compliance, and community-driven content.",
        link: "#global-expansion",
    },
];
