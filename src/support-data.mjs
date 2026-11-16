// Support collections: questions and answers (source: brails.com/support, tidied).
// Each answer is an array of blocks: a string is a paragraph, { ol: [...] } / { ul: [...] } are lists,
// { h: '...' } is a small subheading, { table: [[...head], ...rows] } is a table.

export const collections = [
  {
    slug: 'getting-started', label: 'Getting Started', title: 'Getting started with Brails', sub: 'Frequently asked questions about Brails.',
    icon: 'pencil', tone: 'success', blurb: 'Frequently asked questions about Brails.',
    qa: [
      ['Onboarding Brails', ['Welcome to Brails!', 'Brails is a payment infrastructure company that simplifies global payments for businesses. We help businesses optimise their international payment processes, saving them time and resources while providing a more efficient solution.', 'Whether you’re facilitating transactions across the USA, China, Europe, Africa or beyond, our platform is designed to streamline the process and give you peace of mind.']],
      ['How to sign up', ['Go to <a href="https://account.onbrails.com/authentication/sign-up">account.onbrails.com</a> to create an account, then carefully provide:', { ul: ['Email address', 'Phone number', 'Password (at least 8 characters, with one uppercase letter, one lowercase letter, one number and one special character)', 'Confirm password', 'reCAPTCHA, to verify you’re human'] }]],
      ['How to switch companies', [{ ol: ['Sign in to your business account.', 'On the Home page, click your profile at the top right of your screen.', 'Choose the company you want to switch to, and you’re done!'] }]],
      ['How to add a new company', [{ ol: ['On the Home page, click your profile at the top right of your screen.', 'Click Switch company.', 'Click Add new company.', 'Complete the compliance process for the new company. Done!'] }]],
      ['Why can’t I sign in to my account?', ['There are a few reasons you might have difficulty signing in:', { ul: ['You may not be entering the correct login details. Check that your password is typed correctly.', 'You may have forgotten your password. To fix this, reset your password from the sign-in page.', 'Your internet connection may be unstable. Check you’re connected to a stable, active connection, or restart your internet and try again.'] }, 'Tip: clear your browser cache and cookies, open a new window, and make sure you use the correct password.', 'If you’re still having trouble signing in, email us at <a href="mailto:support@onbrails.com">support@onbrails.com</a>.']],
      ['What is a Business ID?', ['A Business ID is a unique six-digit number generated for each company. It sits at the top right of your Home page and can be used to make internal transfers from one company to another.']],
    ],
    related: [['Transactions guide', 'Learn how to make transactions, track payments and manage your transaction history.', 'transactions'], ['Managing your wallet', 'Everything you need to know about managing your Brails wallet and funds.', 'wallet']],
  },
  {
    slug: 'verification', label: 'Verification', title: 'Verification with Brails', sub: 'Frequently asked questions about verification.',
    icon: 'shieldCheck', tone: 'info', blurb: 'Frequently asked questions about verification.',
    qa: [
      ['KYB (Know Your Business) verification', ['You’ll need to provide the details below to proceed with your verification.', { ul: ['<b>Profile information</b> of the representative: first name, last name, gender, date of birth, nationality, position, phone number and business email address', '<b>Business information</b>: business name, registration number, tax number, business type and country of registration', '<b>Contact information</b>: phone number and business email address', '<b>Address information</b>: street number and street, state and city', '<b>Stakeholder information</b>: for a sole proprietorship, the sole proprietor’s details; for a limited liability company, the directors and UBOs (shareholders who own more than 25%). Nigerian companies also provide BVN details', '<b>Documents</b>'] }]],
      ['Why do I need to do KYB?', ['KYB is a key part of our security and compliance policy. It helps us know who interacts with our platform and protects your assets from being compromised.']],
      ['When do I complete my KYB?', ['Before performing any transaction. Completing KYB in full gives your business access to every feature on the platform.']],
      ['What are the KYB requirements?', ['As part of our AML/CFT policy, we verify every business to make sure our platform isn’t used for money laundering or terrorist financing. The documents we need depend on your business type:', { h: 'Sole proprietorship (one-person business)' }, { ul: ['Proof of address', 'Sole proprietor’s ID', 'Business name certificate, business name registration approval or formation certificate', 'Business account statement from the last 3 months', 'Operating agreement for US companies (LLC)', 'EIN for US companies'] }, { h: 'Private company limited by shares, or a public company' }, { ul: ['Proof of address', 'ID details for every shareholder', 'Certificate of incorporation and a corporate account statement from the last 3 months', 'Certified register of shareholders', 'Certified register of directors', 'Memorandum and articles of association', 'AML policy (financial service companies and payment platforms)', 'Operating licence where applicable', 'EFCC SCUML certificate for businesses that aren’t fintech or payment-related'] }, { h: 'Unregistered business' }, { ul: ['Proof of ID of the sole proprietor', 'Proof of address of the sole proprietor', 'Proof of business address'] }, { h: 'Incorporated trustees' }, { ul: ['Proof of address', 'Trustees’ information (ID, BVN)', 'NGO certificate of registration', 'Constitution of the non-profit', 'Account statement'] }]],
      ['How to set up KYB', ['From your dashboard, click Getting started to begin. There are six steps:', { h: 'Step 1: Personal profile (compulsory)' }, 'Your profile is pre-filled from sign-up. You can edit everything except your email, then click Next and Save.', { h: 'Step 2: Business information (compulsory)' }, 'Add your business logo, business type (individual, business or NGO), name, country, description, source of funds and industry, then click Save.', { h: 'Step 3: Business contact information (optional)' }, 'Add your business email address and phone number, and optionally your social media links.', { h: 'Step 4: Address information (optional)' }, 'Add your country, state or region, city, postal code, street and house number, and upload a clear proof of address. If your company isn’t in an English-speaking country (for example Togo or Benin), circle the main address on the document.', { h: 'Step 5: Stakeholder, trustee or owner information (optional)' }, 'Add every shareholder if you’re a business: name, phone, email, nationality, date of birth, document number and an image of the document, and select the stakeholder type.', { h: 'Step 6: Document upload' }, 'Upload the documents for your business. Our compliance team may request more documents if needed, and we’ll email you when they do.']],
    ],
    related: [['Security', 'How Brails protects your business information.', '../security'], ['Managing beneficiaries', 'How to add and manage beneficiaries after completing KYB.', 'beneficiaries']],
  },
  {
    slug: 'wallet', label: 'Wallet', title: 'Wallets with Brails', sub: 'Frequently asked questions about wallets.',
    icon: 'wallet', tone: 'purple', blurb: 'Frequently asked questions about wallets.',
    qa: [
      ['How to add a wallet', [{ ol: ['In the left navigation, click Home.', 'Click Add wallet or the + button.', 'Choose the currency for the new wallet from the dropdown.', 'Click Add wallet. You’re done!'] }, 'You can also go to Wallets in the left navigation, click the + beside the USD icon, choose a currency and click Add wallet.']],
      ['How to swap funds', [{ ol: ['Click Wallets, then Swap.', 'Select a source wallet and a destination wallet.', 'Type in an amount to see the exchange rate.', 'If you’re happy with the rate, click Next.', 'Review the summary and click Proceed.', 'Enter your 2FA code to authorise the swap. Done!'] }]],
      ['How to make a transfer', ['There are two types of transfer:', { ul: ['<b>Transfer</b>: an external payment out of your Brails account to a beneficiary’s bank account.', '<b>Internal transfer</b>: a payment to another company on Brails, using their Business ID.'] }, 'To make a transfer:', { ol: ['Click Wallets, then Transfer.', 'Choose your transfer method and click Next.', 'Select a beneficiary, or add a new one.', 'Enter the amount and click Next.', 'Enter a description and click Next.', 'Review the summary and click Proceed.', 'Enter your 2FA code to authorise the transfer.'] }]],
      ['Internal transfer steps', ['Internal transfers move money from your account to another Brails business using their Business ID.', { ol: ['Click Wallets in the left navigation.', 'Click Transfer, then Transfer to Brails account.', 'Enter the recipient’s six-digit Business ID and click Next.', 'Select the wallet the funds should go to.', 'Enter the amount and click Next.', 'Enter a description and click Next.', 'Review the summary and click Proceed.', 'Enter your 2FA code to authorise the transfer. Done!'] }]],
      ['How long do transfers take?', ['Most transfers are successful within a few minutes to an hour. If there are delays, it can take 24 to 72 working hours.', 'For transfers to US beneficiaries:', { ul: ['<b>ACH</b>: payments to individual and business accounts. Takes at most 72 working hours.', '<b>Wire</b>: payments to business accounts only. Processed within 24 working hours.'] }]],
      ['How to deposit into your wallet', ['There are three main ways to deposit: USD, other currencies, and your NGN virtual account.', { h: 'Depositing USD' }, { ol: ['Click Wallets, then your USD wallet.', 'Type in the amount you want to deposit.', 'The bank details to pay into are shown. Read and follow the instructions carefully.', 'Click I have made this payment. Your deposit reflects within 1–48 hours.'] }, { h: 'Depositing NGN' }, { ol: ['Click Wallets, then the wallet you want to fund.', 'Type in the amount and pay into the account details shown.', 'Click I have made this payment. Your deposit reflects within 5 minutes.'] }, { h: 'Depositing with MoMo-enabled wallets' }, { ol: ['Click Wallets, then the wallet you want to fund.', 'Enter the amount and your phone number, then click Submit.', 'Complete the payment request sent to your MoMo number. Your deposit reflects within 5 minutes.'] }, 'Your business must be verified, and you need a wallet other than USD, before you can see the deposit button for NGN and MoMo.']],
    ],
    related: [['Managing transactions', 'Track payments and manage your transaction history.', 'transactions'], ['Managing beneficiaries', 'Add and manage the people and businesses you pay.', 'beneficiaries']],
  },
  {
    slug: 'transactions', label: 'Transactions', title: 'Transactions with Brails', sub: 'Frequently asked questions about transactions.',
    icon: 'swap', tone: 'orange', blurb: 'Frequently asked questions about transactions.',
    qa: [
      ['How to add a wallet', ['For step-by-step instructions, see <a href="support-wallet.html">How to add a wallet</a> in the Wallet collection.']],
      ['How to make a transfer', ['For step-by-step instructions, see <a href="support-wallet.html">How to make a transfer</a> in the Wallet collection.']],
      ['How to make an internal transfer', [{ ol: ['Enter the recipient’s six-digit Business ID and click Next.', 'Select the wallet the funds should go to.', 'Enter the amount and click Next.', 'Enter a description and click Next.', 'Review the summary and click Proceed.', 'Enter your 2FA code to authorise the transfer. Done!'] }]],
      ['Which countries can I send transfers to?', ['You can currently send transfers to recipients in:', { ul: ['Nigeria, Benin, Senegal, Côte d’Ivoire, Cameroon and Congo', 'Kenya, Uganda, Rwanda, Tanzania, Malawi and Zambia', 'Ghana', 'United States, United Kingdom, UAE and Australia', 'China (coming soon)'] }]],
      ['Why is my transfer delayed?', ['A transfer can be delayed for a few reasons:', { ul: ['<b>USD</b>: public holidays can delay transfers.', '<b>NGN</b>: downtime on a banking system (NIBSS or the receiving bank).', '<b>KES</b>: downtime on a banking system (Tanda).'] }]],
      ['How long does it take to process my transfer?', ['Most transfers are successful within a few minutes to an hour. If there are delays, it can take 24 to 72 working hours.', 'For transfers to US beneficiaries, ACH payments take at most 72 working hours, and wire payments (business accounts only) are processed within 24 working hours.']],
    ],
    related: [['Managing your wallet', 'Manage your wallet, make deposits and handle different currencies.', 'wallet'], ['Managing beneficiaries', 'How to add and manage beneficiaries for transactions.', 'beneficiaries']],
  },
  {
    slug: 'virtual-card', label: 'Virtual Card', title: 'Virtual cards with Brails', sub: 'Frequently asked questions about virtual cards.',
    icon: 'card', tone: 'pink', blurb: 'Frequently asked questions about virtual cards.',
    qa: [
      ['Is there a withdrawal limit on the card?', ['Yes. Leave at least $1 on your card when you withdraw, so the card stays active.']],
      ['What’s the most I can add to my card at once?', ['The maximum top-up is $5,000.']],
      ['What is the fee for funding my virtual card?', ['It costs $1 to top up your virtual dollar card with up to $100, and 1% for any amount above $100.']],
      ['What is the minimum amount to create a card?', ['You can create a card with a minimum of $3.']],
      ['How long does a card withdrawal take?', ['Card withdrawals take up to 1 hour to process.']],
      ['Is there a maximum balance my card can hold?', ['Yes. Each card can hold up to $10,000 at a time.']],
      ['Is there a card maintenance fee?', ['No. There’s no maintenance fee on your virtual dollar card.']],
      ['Why can’t I create a virtual card?', ['Either your KYB hasn’t been completed, or you haven’t created a card user yet.']],
      ['What other fees do I pay for the card?', ['Our virtual cards are in US dollars, so a cross-border fee applies when you pay in another currency: 2.5% plus a settlement charge of $0.50 per transaction.']],
      ['Why am I charged a cross-border fee on a USD card?', ['A payment can be to a US company and in USD, yet still incur a cross-border fee, because the company settles the payment outside the US. They charge us the fee, and we only pass it on when we’re charged.', 'Facebook ad payments are a common example: Facebook is a US company charging in USD, but sometimes still applies a cross-border fee.']],
      ['How long does card termination take?', ['About 10 minutes.']],
      ['Why is my card payment failing?', [{ ul: ['<b>Insufficient balance</b>: the most common reason. Make sure your card covers the full amount, including taxes and the card’s minimum balance.', '<b>Merchant controls</b>: some merchants block cards because of IP or card location, card details or balance checks. Contact the merchant to confirm how to proceed.', '<b>Regional payment rules</b>: some services check that your location matches the card’s currency. For example, Apple may reject USD cards if your device region isn’t the United States. Change your device or store region to the United States.'] }]],
      ['Should I withdraw or terminate my virtual card?', [{ table: [['Card withdrawal', 'Card termination'], ['Your card stays active', 'Your card no longer exists'], ['You can still fund and use the card', 'You’ll need to create and fund a new card'], ['The amount withdrawn goes to your USD wallet', 'The balance on the card goes to your USD wallet'], ['Needs a minimum balance of $1 to keep the card active', 'No minimum balance needed']] }]],
      ['Charges and limits', [{ table: [['Action', 'Fee'], ['Card creation', '$1.00'], ['Card top-up', '$1 up to $100; 1% above $100'], ['Card withdrawal', 'No fee'], ['Card termination', 'No fee'], ['Cross-border fees', '3% plus $0.50 per transaction'], ['Maintenance', 'No fee']] }]],
      ['How to create card users', [{ ol: ['Click Virtual cards in the side navigation.', 'Click Card users.', 'Click Create card user at the top right.', 'Choose whether it’s for an external user or a team member.', 'Follow the prompts to add the user’s information, address and identification.', 'Click Save. You’re done!'] }]],
      ['How to create a gift card', [{ ol: ['Click Virtual cards in the side navigation.', 'Click Create gift card.', 'Enter the details required.', 'Make sure you have at least $2 in your chosen wallet, then click Next.', 'Review the summary, click Proceed and enter your four-digit transaction PIN.', 'Click Send. You’re done!'] }]],
      ['How to create virtual cards', ['You’ll need a card user first.', { ol: ['Click Virtual cards, then Card users.', 'Click the user you want to create a card for (or the three dots under Action).', 'Click Create virtual card.', 'Enter an amount to fund the card and confirm the summary.', 'Enter your 2FA code. Card creation starts, and the card becomes active shortly after.'] }, 'Companies funding cards for their customers can add up to $1,000. From the card, you can also top up, withdraw, freeze or terminate it.']],
    ],
    related: [['Managing your wallet', 'Fund your wallet for virtual card transactions.', 'wallet'], ['Customers', 'How to manage customers and their card access.', 'customers']],
  },
  {
    slug: 'customers', label: 'Customers', title: 'Customers with Brails', sub: 'Frequently asked questions about customers.',
    icon: 'briefcase', tone: 'cyan', blurb: 'Frequently asked questions about customers.',
    qa: [
      ['How to add customers', ['A customer is the person performing actions on the dashboard. You can search for a customer, filter, and export a CSV.', { ol: ['Click Customers in the left navigation.', 'Click Add customer.', 'Enter the customer’s first and last name, phone number and email address. You’re done!'] }]],
    ],
    related: [['Virtual cards', 'Create and manage virtual cards for your customers.', 'virtual-card'], ['Verification', 'The verification process and requirements.', 'verification']],
  },
  {
    slug: 'beneficiaries', label: 'Beneficiaries', title: 'Beneficiaries with Brails', sub: 'Frequently asked questions about beneficiaries.',
    icon: 'users', tone: 'yellow', blurb: 'Frequently asked questions about beneficiaries.',
    qa: [
      ['How to add beneficiaries', [{ ol: ['Click Beneficiaries in the left navigation.', 'Click Add beneficiaries on the right of the page.', 'Select a country (the currency is filled in for you).', 'Select the payment method and click Next.', 'Enter the beneficiary’s payment details accurately.', 'Click Add beneficiary. You’re done!'] }, 'You can also add a beneficiary while making a transfer: Wallets → Transfer → Select beneficiary → Add new beneficiary. If the country has only one payment method, the currency and method are filled in for you.']],
      ['Send funds to a beneficiary', [{ ol: ['Click Beneficiaries in the left navigation.', 'Search by email, or click the three dots under Actions.', 'Click Transfer.', 'Follow the steps to make a transfer. You’ve sent funds to a beneficiary!'] }]],
    ],
    related: [['Managing your wallet', 'Fund your wallet before paying beneficiaries.', 'wallet'], ['Transaction history', 'Track the transfers you’ve sent.', 'transactions']],
  },
  {
    slug: 'developers', label: 'Developers', title: 'Developers with Brails', sub: 'Frequently asked questions about developers.',
    icon: 'code', tone: 'warning', blurb: 'Frequently asked questions about developers.',
    qa: [
      ['How to integrate with our APIs', ['Here you can find your public and secret keys, set up webhooks, view webhook logs, and add or delete IPs.', { ol: ['In the left navigation, click Developers.', 'Click API key & webhook URL.', 'Click Generate new to create a secret API key, then enter your 2FA code.', 'Copy the secret key and the public API key.', 'Enter your webhook URL and click Save changes.'] }]],
      ['How to search webhook logs', [{ ol: ['Click Webhook logs.', 'Type in the box to search by event name.', 'See every webhook in a table with its date, status and reference.', 'To filter by status, click Filter → Status and choose Successful or Failed.', 'To filter by period, click Filter → Period and choose a date range, a specific day or all time.'] }]],
      ['How to search IP addresses', [{ ol: ['In the left navigation, click Developers, then IP whitelisting.', 'Type in the box to search by IP.', 'To add an address, click Add IP address, enter a label and the IP, then your 2FA code.', 'The table shows each label, address and date. You can copy or delete an address (deleting needs your 2FA code).', 'Filter by status or period.'] }]],
    ],
    related: [['Developer docs', 'Integrate payouts, wallets and webhooks with the Brails API.', '../developers'], ['Security', 'How Brails keeps your integration and data secure.', '../security']],
  },
  {
    slug: 'settings', label: 'Settings', title: 'Settings with Brails', sub: 'Frequently asked questions about settings.',
    icon: 'sliders', tone: 'error', blurb: 'Frequently asked questions about settings.',
    qa: [
      ['Compliance', ['Already completed your KYB and need to update a document?', { ol: ['Go to Settings → Compliance → Documents.', 'Click Edit next to the document you want to replace.'] }, 'You can also email the documents to <a href="mailto:onboarding@onbrails.com">onboarding@onbrails.com</a> or <a href="mailto:support@onbrails.com">support@onbrails.com</a> and we’ll help.']],
      ['Teams', ['View your members and invite new ones. You’ll need the new member’s email address, first name and last name, and to choose a role.', { ul: ['<b>Member</b>: can view information and make settings changes in the dashboard.', '<b>Admin</b>: can also resend invites, remove team members, and carry out all card actions (create, top up and withdraw).'] }]],
      ['Security: passwords, transaction PIN and 2FA', [{ h: 'Password management' }, { ol: ['Click Settings, then Security.', 'Click Manage passwords.', 'Fill in the details and click Submit.', 'Sign in with your new password.'] }, { h: 'Set your transaction PIN' }, { ol: ['Click Settings, then Security.', 'Click Manage PIN, then Set PIN.', 'Enter a four-digit number you’ll remember and click Send.'] }, { h: 'Change your transaction PIN' }, { ol: ['Click Settings → Security → Manage PIN → Change PIN.', 'Enter your current PIN and click Send.', 'Enter a new four-digit PIN and click Send.'] }, { h: 'Two-factor authentication' }, { ol: ['Click Settings and switch two-factor authentication on.', 'Scan the QR code with your authenticator app.', 'Enter the six-digit code from the app and click Send.'] }]],
    ],
    related: [['Security', 'Passwords, transaction PIN and two-factor authentication.', '../security'], ['Verification', 'The documents your business needs for KYB.', 'verification']],
  },
];
