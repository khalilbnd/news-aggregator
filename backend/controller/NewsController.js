import { NewsModel } from "../model/NewsModel.js";
import { UserModel } from "../model/UserModel.js";

export const GetNewsController = (req, res) => {
    
    const title = req.query.title || '';  // Title to filter news by (partial match)

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const query = { title: { $regex: title, $options: 'i' } };


    NewsModel.find(query).then((news, err)=>{
        if(err){
            console.log(err);
        }
    
        news.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        const paginatedNews = news.slice(startIndex, endIndex);
    
        res.json({
            page,
            limit,
            total: news.length,
            data: paginatedNews
        });    
    })
    
    
}

export const PutNewsAsSeen = async (req, res) => {
    const { guid } = req.params;

    NewsModel.findOne({guid}).then((news, err)=>{
        if(err){
            console.log(err);
        }
        if(!news){
            return res.status(404).json({msg: 'News not found'});
        }
    })
    

    try {
        
        if(Array.from(req.user.news_seen).includes(guid)){
            return res.status(400).json({msg: 'News already seen'});
        } else {
            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: req.user.id },
                { $push: { news_seen: guid } },
                { new: true }
            ).exec();
    
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
    
            res.json({msg: "Marked as seen successfully"});
        }

    } catch (err) {
        console.error("Something went wrong when updating data!", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


