const express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router({
        mergeParams: true
    }),
    Project = require('../models/Project'),
    Section = require('../models/Section'),
    News = require('../models/News'),
    Team = require('../models/Team'),
    Image = require('../models/ProjectImage');

router.get('/', (req, res) => {
    Project.find({})
        .then((projects) => {
            const projectsToDisplay = [];
            let i;
            for (i = 0; i < 4; i++) {
                projectsToDisplay.push(projects[i]);
            }
            News.find({})
                .then((news) => {
                    const newsToDisplay = [];
                    let i;
                    for (i = 0; i < 4; i++) {
                        newsToDisplay.push(news[i]);
                    }
                    res.render('public/home', {
                        projects: projectsToDisplay,
                        news: newsToDisplay
                    });
                    console.log('PROJECT TO DISPLAY', projectsToDisplay);
                    console.log('News TO DISPLAY', newsToDisplay);
                })
                .catch((err) => console.log('ERROR LOADING THE NewsTO INITIAL PAGE', err));

        })
        .catch((err) => console.log('ERROR LOADING THE PROJECT TO INITIAL PAGE', err));


});

router.get('/news', (req, res) => {
    News.find({})
        .then((allNews) => {
            res.render('news/index', {
                news: allNews
            });
        })
        .catch(err => console.log('Error finding the News', err));
});
router.get('/publication', (req, res) => {
    let data = [{
        title: 'The substance use risk profile scale: A scale measuring traits linked to reinforcement-specific substance use profiles',
        desc: 'The Substance Use Risk Profile Scale (SURPS) is based on a model of personality risk for substance abuse in which four personality dimensions (hopelessness, anxiety sensitivity, impulsivity, and sensation seeking) are hypothesized to differentially relate to specific patterns of substance use. The current series of studies is a preliminary exploration of the psychometric properties of the SURPS in two populations (undergraduate and high school students)'
    }, {
        title: 'The IMAGEN study: reinforcement-related behaviour in normal brain function and psychopathology',
        desc: 'A fundamental function of the brain is to evaluate the emotional and motivational significance of stimuli and to adapt behaviour accordingly. The IMAGEN study is the first multicentre genetic-neuroimaging study aimed at identifying the genetic and neurobiological basis of individual variability in impulsivity, reinforcer sensitivity and emotional reactivity, and determining their predictive value for the development of frequent psychiatric disorders'
    }, {
        title: 'Functional associations among trauma, PTSD, and substance-related disorders',
        desc: 'This review article presents several potential functional pathways which may explain the frequent co-occurrence of PTSD and substance abuse disorders in traumatized individuals.'
    }, {
        title: 'Efficacy of cognitive–behavioral interventions targeting personality risk factors for youth alcohol misuse',
        desc: 'Sensation seeking, anxiety sensitivity, and hopelessness are personality risk factors for alcohol use disorders, each associated with specific risky drinking motives in adolescents.'
    }, {
        title: 'Adolescent impulsivity phenotypes characterized by distinct brain networks',
        desc: 'The impulsive behavior that is often characteristic of adolescence may reflect underlying neurodevelopmental processes. Moreover, impulsivity is a multi-dimensional construct, and it is plausible that distinct brain networks contribute to its different cognitive, clinical and behavioral aspects.'
    }, {
        title: 'Psychometric evaluation of the five-factor Modified Drinking Motives Questionnaire—Revised in undergraduates',
        desc: 'The psychometric properties of the Modified Drinking Motives Questionnaire — Revised (Modified DMQ-R) [Blackwell, E., & Conrod, P. J. (2003). A five-dimensional measure of drinking motives.'
    }, {
        title: 'Personality‐targeted interventions delay the growth of adolescent drinking and binge drinking',
        desc: ' Personality factors are implicated in the vulnerability to adolescent alcohol misuse. This study examined whether providing personality‐targeted interventions in early adolescence can delay drinking and binge drinking in high‐risk youth.'
    }, {
        title: 'Correlated gene expression supports synchronous activity in brain networks',
        desc: 'During rest, brain activity is synchronized between different regions widely distributed throughout the brain, forming functional networks. However, the molecular mechanisms supporting functional connectivity remain undefined. We show that functional brain networks defined with resting-state functional magnetic resonance imaging can be recapitulated by using measures of correlated gene expression in a post mortem brain tissue data set.'
    }, {
        title: 'Validation of a system of classifying female substance abusers on the basis of personality and motivational risk factors for substance abuse.',
        desc: 'This study explored the validity of classifying a community-recruited sample of substance-abusing women (N= 293) according to 4 personality risk factors for substance abuse (anxiety sensitivity, introversion-hopelessness, sensation seeking, and impulsivity). '
    }, {
        title: 'Neuropsychosocial profiles of current and future adolescent alcohol misusers',
        desc: 'A comprehensive account of the causes of alcohol misuse must accommodate individual differences in biology, psychology and environment, and must disentangle cause and effect. '
    }, {
        title: 'Long-term effects of a personality-targeted intervention to reduce alcohol use in adolescents.',
        desc: 'To examine the long-term effects of a personality-targeted intervention on drinking quantity and frequency (QF), problem drinking, and personality-specific motivations for alcohol use in early adolescence.'
    }, {
        title: 'The neural basis of video gaming',
        desc: 'Video game playing is a frequent recreational activity. Previous studies have reported an involvement of dopamine-related ventral striatum. However, structural brain correlates of video game playing have not been investigated.'
    }];
    res.render('public/pub', {
        data: data
    });
});
router.get('/contact', (req, res) => {
    res.render('public/contact')
});


module.exports = router;