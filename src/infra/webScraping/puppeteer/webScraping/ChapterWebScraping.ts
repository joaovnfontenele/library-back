import puppeteer from 'puppeteer';
import config from './config';
import { autoScroll } from 'src/utils/puppeteer/autoScroll';
import { ChapterWeb } from 'src/modules/chapter/entities/chapterWeb';

interface Paragraph {
    content: string,
    order: number
}

export class ChapterWebScraping {
    static async createChapter(url: string, siteId: string, number?: number): Promise<ChapterWeb> {
        const browser = await puppeteer.launch(config)
        const page = await browser.newPage();

        const getSites = {
            //novelBin
            '0b307d46-73c1-49cb-b34a-6b32fab05f88': () => {
                const title: HTMLSpanElement | null = document.querySelector('#chapter > div > div > h2 > a > span')
                let paragraphs: Paragraph[] = []
                document.querySelector("#chr-content")?.querySelectorAll('p')?.forEach((item, index) => {
                    paragraphs.push({
                        content: item.innerText,
                        order: index
                    })
                })
                const nextChapter: HTMLLinkElement | null = document.querySelector("#next_chap")
                const numberChapter = title?.innerText?.split(' ')[1]?.replace(/[^0-9]/g, '')
                return {
                    title: title?.innerText ?? '',
                    nextChapter: nextChapter?.href ?? '',
                    number: numberChapter ? +numberChapter : 0,
                    paragraphs: paragraphs ?? [],
                }
            },
            //mtl novel 
            'a2aea072-d8d5-466f-91e4-efcfe1699c7e': () => {
                const title: HTMLSpanElement | null = document.querySelector('.main-title')
                let paragraphs: Paragraph[] = []
                document.querySelector("body > main > article > div > div.post-content > div.par.fontsize-16")?.querySelectorAll('p')?.forEach((item, index) => {
                    paragraphs.push({
                        content: item.innerText,
                        order: index
                    })
                })
                const nextChapter: HTMLLinkElement | null = document.querySelector(".chapter-nav a.next")
                const numberChapter = (document.querySelector("body > main > article > div > div.crumbs > span.current-crumb") as HTMLSpanElement)?.innerText?.split(' ')[1]?.replace(/[^0-9]/g, '')
                return {
                    title: title?.innerText ?? '',
                    nextChapter: nextChapter?.href ?? '',
                    number: numberChapter ? +numberChapter : 0,
                    paragraphs: paragraphs ?? [],
                }
            },
            "a6e0a337-8c3b-47c5-9c90-6ea5185fcf77": () => {
                const title: HTMLSpanElement | null = document.querySelector('.infox > h1')
                let paragraphs: Paragraph[] = []
                document.querySelector("body > main > article > div > div.post-content > div.par.fontsize-16")?.querySelectorAll('p')?.forEach((item, index) => {
                    paragraphs.push({
                        content: item.innerText,
                        order: index
                    })
                })
                const nextChapter: HTMLLinkElement | null = document.querySelector(".chapter-nav a.next")
                const numberChapter = (document.querySelector("body > main > article > div > div.crumbs > span.current-crumb") as HTMLSpanElement)?.innerText?.split(' ')[1]?.replace(/[^0-9]/g, '')
                return {
                    title: title?.innerText ?? '',
                    nextChapter: nextChapter?.href ?? '',
                    number: numberChapter ? +numberChapter : 0,
                    paragraphs: paragraphs ?? [],
                }
            },
            //novelhall
            '01e42894-4916-4e2d-8615-f80db0a0ba1e': () => {
                const title: HTMLSpanElement | null = document.querySelector('#main > div > div > article > div.single-header > h1')
                let paragraphs: Paragraph[] = []
                const contentParagraphs = document.querySelector("#htmlContent")

                paragraphs = contentParagraphs?.innerHTML ? contentParagraphs?.innerHTML?.split('<br><br>')?.map((item, index) => {

                    const p = document.createElement('p')
                    p.innerHTML = item

                    return {
                        content: p.innerText,
                        order: index
                    }
                }) : []

                const nextChapter: HTMLLinkElement | null = document.querySelector(`#main > div > div > nav > a[rel="next"]`)
                const numberChapter = title?.innerText.split(' ')[1]?.replace(/[^0-9]/g, '')
                return {
                    title: title?.innerText ?? '',
                    nextChapter: nextChapter?.href ?? '',
                    number: numberChapter ? +numberChapter : 0,
                    paragraphs: paragraphs ?? [],
                }
            },
            //scribblehub
            "3ff1b724-f671-4474-9995-f1b0a0cc97e3": () => {
                const title: HTMLParagraphElement | null = document.querySelector('div.chapter-title')
                let paragraphs: Paragraph[] = []
                document.querySelector("#chp_raw")?.querySelectorAll('p')?.forEach((item, index) => {
                    paragraphs.push({
                        content: item.innerText,
                        order: index
                    })
                })


                const nextChapter: HTMLLinkElement | null = document.querySelector(`#chp_contents > div.nav_chp_fi > div > a.btn-wi.btn-next`)
                const numberChapter = title?.innerText.split(' ')[1]?.replace(/[^0-9]/g, '')

                return {
                    title: title?.innerText ?? '',
                    nextChapter: nextChapter?.href ?? '',
                    number: 0,
                    paragraphs: paragraphs ?? [],
                }
            }
        }

        try {
            await page.goto(url);
            await autoScroll(page)
            let chapterWeb = await page.evaluate(getSites[siteId])

            await browser.close();

            if (chapterWeb.number == 0 && number) {
                chapterWeb.number = number + 1
            }
            const chapter = new ChapterWeb(chapterWeb)

            return chapter

        } catch (error) {
            await browser.close();
            throw new Error(error)
        }
    }

}