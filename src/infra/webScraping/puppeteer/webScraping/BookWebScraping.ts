import puppeteer from 'puppeteer';
import config from './config';

export class BookWebScraping {
    static async createBook(url: string, siteId: string): Promise<any> {
        try {
            const browser = await puppeteer.launch(config)
            const page = await browser.newPage();
            await page.goto(url);
            const book = await page.evaluate(() => {
                const title = document.querySelector('.title')?.innerHTML
                const description = document.querySelector("#tab-description .desc-text")?.innerHTML
                const image = document.querySelector(' #novel .books .book')?.querySelector('img')?.getAttribute('src')

                if (!title || !description || !image) { throw new Error() }

                const book = {
                    title,
                    description,
                    image
                }

                return book
            })
            await browser.close();
            return book
        } catch (error) {
            throw new Error(error)
        }
    }
}
