import xml2js from 'xml2js';
import fetch from 'node-fetch'; 
import { NewsModel } from '../model/NewsModel.js';

export async function fetchNews(io) {
    const url = 'https://news.google.com/rss'; 

    io.emit('message', { msg: 'Fetching news...' });

    try {
        const response = await fetch(url); 
        const data = await response.text();

        xml2js.parseString(data, async (err, result) => {
            if (err) {
                console.error('Error parsing XML', err);
                return;
            }

            const items = result.rss.channel[0].item;

            // Using a for...of loop for better async handling
            for (const item of items) {
                try {
                    const newsRecord = new NewsModel({
                        title: item.title[0],
                        link: item.link[0],
                        pubDate: new Date(item.pubDate[0]),
                        description: item.description[0],
                        guid: item.guid[0]._ || item.guid[0],
                        source: {
                            name: item.source[0]._ || item.source[0],
                            url: item.source[0].$.url || ''
                        }
                    });

                    await newsRecord.save();
                    console.log('News saved to database', newsRecord);

                    io.emit('news', newsRecord); // Emit each news record after saving
                } catch (error) {
                    
                }
            }
        });
    } catch (error) {
        console.error('Error fetching news', error);
    }
}
