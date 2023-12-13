import puppeteer from 'puppeteer';
import config from './config';

export class BookWebScraping {
    static async createBook(url: string, siteId: string): Promise<any> {

        const siteBook = {
            //novel bin
            '0b307d46-73c1-49cb-b34a-6b32fab05f88': () => {
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
            },
            //mtl novel 
            'a2aea072-d8d5-466f-91e4-efcfe1699c7e': () => {
                const title = document.querySelector('.entry-title')?.innerHTML
                const description = document.querySelector(".desc")?.innerHTML
                const image = document.querySelector('body > main > article > div.m-card.single-page > div.post-content > div > amp-img')?.querySelector('img')?.getAttribute('src')

                if (!title || !description || !image) { throw new Error() }

                const book = {
                    title,
                    description,
                    image
                }

                return book
            },
            //lightNovelBrasil
            "a6e0a337-8c3b-47c5-9c90-6ea5185fcf77": () => {
                const title = document.querySelector('div.infox > h1')?.innerHTML
                const description = document.querySelector(" div.entry-content")?.innerHTML?.replaceAll('<p>', '')?.replaceAll('</p>', '')
                const image = document.querySelector('div.thumbook > div:nth-child(1)')?.querySelector('img')?.getAttribute('src')

                if (!title || !description || !image) { throw new Error() }

                const book = {
                    title,
                    description,
                    image
                }

                return book
            },
            '44701f2c-1b52-46f4-b17b-1eb33a71f1a5': () => {
                const title = (document.querySelector('body > div.page > div.det-hd.mb48 > div > div > div._mn.g_col._8.pr > h1') as HTMLParagraphElement)?.innerText
                const description = (document.querySelector("#about > div.g_wrap.det-abt.mb48 > div.g_txt_over.mb48.fs16.j_synopsis._txtover > p") as HTMLParagraphElement)?.innerText
                const image = document.querySelector('body > div.page > div.det-hd.mb48 > div > div > div._sd.g_col._4 > i')?.querySelector('img')?.getAttribute('src')

                if (!title || !description || !image) { throw new Error() }

                const book = {
                    title,
                    description,
                    image
                }

                return book
            },
            //novelhall
            "01e42894-4916-4e2d-8615-f80db0a0ba1e": () => {
                const title = (document.querySelector('#main > div > div.book-main.inner.mt30 > div.book-info > h1') as HTMLParagraphElement)?.innerText
                const description = (document.querySelector("#main > div > div.book-main.inner.mt30 > div.book-info > div.intro") as HTMLParagraphElement)?.innerText
                const image = document.querySelector('.book-img')?.querySelector('img')?.getAttribute('src')

                if (!title || !description || !image) { throw new Error() }

                const book = {
                    title,
                    description,
                    image
                }

                return book
            },
            //scribblehub
            "3ff1b724-f671-4474-9995-f1b0a0cc97e3": () => {

                const title = (document.querySelector('#page > div > div.wi_fic_wrap.bottom > div > div.novel-container > div.fic_title') as HTMLParagraphElement)?.innerHTML
                const description = (document.querySelector("#page > div > div.wi_fic_wrap.bottom > div > div.wi-fic_l-content.fic > div.box_fictionpage.details > div > div.wi_fic_desc") as HTMLParagraphElement)?.innerText
                const image = document.querySelector('#page > div > div.wi_fic_wrap.bottom > div > div.novel-container > div.novel-cover > div.fic_image')?.querySelector('img')?.getAttribute('src')
                if (!title || !description || !image) { throw new Error() }

                const book = {
                    title,
                    description,
                    image
                }

                return book

            }
        }

        const browser = await puppeteer.launch(config)
        const page = await browser.newPage();
        await page.goto(url);
        try {
            const book = await page.evaluate(siteBook[siteId])
            await browser.close();
            return book
        } catch (error) {
            await browser.close();
            throw new Error(error)
        }
    }
}
