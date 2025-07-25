export const BasicPlans = [
    {
        title: 'Job Automator',
        plan: 'Basic',
        duration: [
            {
                discount: '50%',
                timeframe: 'Per use',
                price: '2,000 NGN'
            },
            {
                discount: '75%',
                timeframe: 'Per week',
                price: '7,000 NGN'
            },
            {
                discount: '100%',
                timeframe: 'Per year',
                price: '20,000 NGN'
            }
        ]
    },
    {
        title: 'Exam Simulator',
        plan: 'basic',
        duration: [
            {
                discount: 'once',
                timeframe: 'Per use',
                price: '2,000 NGN'
            },
            {
                discount: 'week',
                timeframe: 'Per week',
                price: '7,000 NGN'
            },
            {
                discount: 'year',
                timeframe: 'Per year',
                price: '20,000 NGN'
            }
        ]
    },

]

export const PremiumPlans =[{
    title: 'Premium (Everything)',
    plan: 'premium',
    duration: [
        {
            timeframe: 'Per use',
            price: '4,000 NGN'
        },
        {
            timeframe: 'Per week',
            price: '8,000 NGN'
        },
        {
            timeframe: 'Per year',
            price: '40,000 NGN'
        }
    ],
    offers:[
        {
            package: 'Job Automator',
            discount: '100%'
        },
        {
            package: 'Exam Simulator',
            discount: '100%'
        }
    ],
    message: 'Get a 100% of all our product and service for a discounted fee!!'
}]