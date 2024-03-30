import { Text } from '@shopify/polaris';
import logo from '../../assets/dequelab-logo.png'
export default function Welcome() {
    return (
        <div className="md:flex relative rounded-lg bg-gray-700 mb-5 hidden">
            <img className="w-40" src={logo} alt="Deque Lab Logo" />
            <div className="z-10 relative flex flex-col justify-center gap-0.5">
                <a
                    target="_blank"
                    class="appearance-none inline text-white p-0 bg-none border-none cursor-pointer focus:outline-none Polaris-Link--monochrome no-underline"
                    href="https://dequelab.com"
                    rel="noopener noreferrer"
                    data-polaris-unstyled="true"
                >
                    <Text variant="heading2xl" as="h3" tone="text-inverse">
                        Welcome to Deque Lab!
                    </Text>
                </a>
                <p class="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--medium Polaris-Text__text--inverse">
                    Crafted solutions for your Shopify store.
                </p>
            </div>
            <img
                src="https://cdn.shopify.com/shopifycloud/partners-web-platform/partners-dashboard/bce54ed2edcf1bf48bda.svg"
                alt=""
                class="absolute right-4 top-4"
            />
        </div>
    );
}
