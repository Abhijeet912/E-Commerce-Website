class APIFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }


    search(){
        const keyword=this.queryStr.keyword ?{
            name:{
                $regex: this.queryStr.keyword,
                $options:'i' //case insensitive
            }
        }:{}
        
        //console.log(keyword);
        this.query=this.find({...keyword});
        return this;
    }
    filter(){

        const queryCopy={...this.queryStr};
        

        //console.log(queryCopy);
        //removing fields from query
        const removeFields=['keyword','limit','page']
        removeFields.forEach(el=> delete queryCopy[el]);

        //Advance Filters
        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`) //putting dollar sign for mongo operator

        //console.log(queryCopy);
        this.query=this.queryStr.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resPerpage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resPerpage*(currentPage-1);


        this.query=this.queryStr.limit(resPerpage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;