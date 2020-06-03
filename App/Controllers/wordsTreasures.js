const WordsTreasure = require('../Schemas/wordsTresure');
exports.create = async (req, res) => {
    try {       
        let { term, defination } = req.body;
        let body = new WordsTreasure({
            term: term,
            defination: defination
        })
        await body.save();
        return res.send("Your New Term Saved SuccessFully!!")
    } catch (error) {
        res.status(400).send(error.message)
    }
}
exports.get = async (req, res) => {
    try {
        let { term, page, limit, allwords } = req.query;
        page = page ? +page : 1;
        limit = limit ? +limit : 10
        let query = {};
        query["term"] = new RegExp(term, "i");
        if (!allwords) {
            query["active"] = true;
        }
        let response = await WordsTreasure.aggregate([
            { $match: query },
            {
                $facet: {
                    metadata: [{ $count: "total_words" },
                    {
                        $addFields: {
                            page: page,
                            limit: limit,
                            pages: { $ceil: { $divide: ["$total_words", limit] } }
                        }
                    }],
                    data: [{ $skip: (page * limit - limit) }, { $limit: limit }]
                }
            }
        ])
        return res.send(response[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
}
exports.update = async (req, res) => {
    try {
        let { termId } = req.params;
        let response = await WordsTreasure.findByIdAndUpdate(termId, req.body, { new: true });
        return res.send({
            message: "Your Term Updated Successfully!!",
            data: response
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}