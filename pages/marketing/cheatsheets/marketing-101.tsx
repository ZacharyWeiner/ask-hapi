import { createStyles, Image, Accordion, Grid, Col, Container, Center, Title, Button } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import Script from 'next/script';
import Welcome from '../../../components/Welcome/Welcome';

export default function Marketing101() {
    const [canView, setCanView] = useState(false);
    async function login() {
        console.log('Clicked');
        try {
            // eslint-disable-next-line no-undef
            const w = window;
            const token = await w.relayone.authBeta();
            const [payload, signature] = token.split('.');
            const data = JSON.parse(atob(payload)); // Buffer.from(payload, 'base64')
            console.log('Relay Payment Info:', data);
            console.log(data);
            const addressResponse = await axios.get(`https://api.relayx.io/v1/paymail/run/${data.paymail}`);
            const address = addressResponse.data.data;
            console.log(address);
            let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + address)
            let response_data = await walletJSON.json();
            const collectibles = response_data.data['collectibles'];
            console.log({ collectibles });
            const selected = collectibles.filter((c: { origin: string; }) => c.origin === 'cb39db1f05e2a4fccc09bdb799b1c1997a7edd8f5653a798c7b5fa666b20ecab_o2');
            console.log(address, data.paymail, selected);
            if (collectibles.length > 0) {
                setCanView(true);
            }
            return { address, paymail: data.paymail };
        } catch (error) {
            return { error };
        }
    }
    return (
    <div>
        <Welcome />
        <Container size="lg"><Button onClick={login}>Login</Button></Container>
        {canView && 
            <Container size="lg">
            <div> <h1> # 50 ChatGPT prompts to become a great email marketer </h1></div>
            <div> <h3>50 Great Prompts To Learn Email list building and segmentation</h3></div>
            <div>
                <ul>
                    <li> 1. What is email list building and why is it important for a business? </li>
                    <li> 2. How can I grow my email list quickly and effectively? </li>
                    <li>3. What are some common strategies for segmenting an email list? </li>
                    <li> 4. How can segmentation help improve email campaign performance? </li>
                    <li> 5. How can I use lead magnets to attract new subscribers to my email list? </li>
                    <li> 6. What are some best practices for collecting email addresses from website visitors? </li>
                    <li> 7. How can I use social media to drive email sign-ups? </li>
                    <li> 8. How can I use email list segmentation to personalize my campaigns? </li>
                    <li> 9. How can I use A/B testing to optimize my email campaigns for different segments? </li>
                    <li> 10. What are some effective ways to re-engage inactive email subscribers? </li>
                    <li>11. How can I use email list segmentation to improve my e-commerce sales?</li>
                    <li>12. How can I use email automation to nurture leads and convert them into customers?</li>
                    <li>13. How can I use email list segmentation to improve my event marketing?</li>
                    <li>14. How can I use email list segmentation to improve my content marketing?</li>
                    <li>15. How can I use email list segmentation to improve my lead generation?</li>
                    <li>16. How can I use email list segmentation to improve my email deliverability?</li>
                    <li>17. How can I use email list segmentation to improve my email open rates?</li>
                    <li>18. How can I use email list segmentation to improve my click-through rates?</li>
                    <li>19. How can I use email list segmentation to improve my conversion rates?</li>
                    <li>20. How can I use email list segmentation to improve my ROI?</li>
                    <li>21. How can I use social media to grow my email list?</li>
                    <li>22. How can I segment my email list for targeted marketing campaigns?</li>
                    <li>23. How can I use lead magnets to attract new subscribers?</li>
                    <li>24. How can I use exit-intent popups to capture email addresses?</li>
                    <li>25. How can I use a referral program to encourage subscribers to share my emails?</li>
                    <li>26. How can I use surveys to segment my email list?</li>
                    <li>27. How can I use email automation to nurture leads and convert them into subscribers?</li>
                    <li>28. How can I use A/B testing to optimize my email signup forms?</li>
                    <li>29. How can I use retargeting to bring visitors back to my website to subscribe to my email list?</li>
                    <li>30. How can I use webinars to grow my email list?</li>
                    <li>32. How can I use gamification to encourage email signups?</li>
                    <li>33. How can I use email segmentation to improve the ROI of my email campaigns?</li>
                    <li>34. How can I use email triggers to send personalized messages based on subscriber behavior?</li>
                    <li>35. How can I use email list cleaning to remove inactive subscribers and improve deliverability?</li>
                    <li>36. How can I use email list verification to ensure that my list is composed of valid and accurate email addresses?</li>
                    <li> 37. How can I use email list scraping to quickly grow my email list?</li>
                    <li>38. How can I use email list segmentation to send more relevant content to different groups of subscribers?</li>
                    <li>39. How can I use email list segmentation to increase the chances of getting my emails opened and read?</li>
                    <li>40. How can I use email list segmentation to increase the chances of getting my emails clicked and converted?</li>
                    <li>44. How can I use email list segmentation to create more effective lead nurturing campaigns?</li>
                    <li>45. How can I use email list segmentation to increase sales and revenue?</li>
                    <li>46. How can I use email list segmentation to improve customer retention and loyalty?</li>
                    <li>47. How can I use email list segmentation to create more personalized and engaging email campaigns?</li>
                    <li>48. How can I use email list segmentation to create more effective email automation flows?</li>
                </ul>
            </div>
            </Container>
        }
        <Script src="https://one.relayx.io/relayone.js " />
            <Script src="https://unpkg.com/bsv@1.5.6" />
    </div>);
}
