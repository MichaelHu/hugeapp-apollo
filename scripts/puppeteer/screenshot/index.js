const puppeteer = require( 'puppeteer' );
const path = require( 'path' );
const devices = require( 'puppeteer/DeviceDescriptors' );
const scriptRoot = __dirname;
const screenshotsDir = path.resolve( scriptRoot, '../../../screenshot/' );

( async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    /**
     * Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/67.0.3372.0 Safari/537.36
     * Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36
     */
    const browserUserAgent = await browser.userAgent();
    await page.setUserAgent( browserUserAgent.replace( 'Headless', '' ) );
    await page.setViewport( {
        width: 1440 
        , height: 1200 
        , deviceScaleFactor: 1
        , isMobile: false
        , hasTouch: false
        , isLandscape: false
    } );
    const origin = 'http://localhost:8888';
    const pathnames = [
        '/todo'
        , '/echarts/line'
        , '/echarts/bar'
        , '/echarts/heatmap'
        , '/magicbox'
        , '/reactstrap'
        , '/svg/d3-force'
        , '/svg/d3-dendrogram'
        , '/canvas/particle'
        , '/canvas/fireworks'
        , '/webgl/three-basic'
    ];

    var promise = pathnames.reduce( ( p, pathname ) => {
        return p.then( async () => {
            const url = origin + pathname;
            const fileName = pathname.substr( 1 ).replace( '/', '_' ) + '.png';
            console.log( url );
            await page.goto( url );
            await page.waitFor( 1000 );
            await page.screenshot( { path: path.resolve( screenshotsDir, fileName ) } );
        } );
    }, Promise.resolve( 0 ) );

    promise.then( async () => {
        console.log( 'close browser' );
        await browser.close();
    });

} )();
