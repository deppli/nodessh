/**
 * Created by wuxianru on 14-8-13.
 */
exports.st=function(req,res){
    if(!req.session.testid){
        req.session.testid=2;
    }

    if(req.session.testid==2){
        req.session.user={
            username:"sam",
            pass:"1234",
            count:1
        }
    }
    req.session&&req.session.testid&&(req.session.testid+=1);
    console.log(req.session.id);
    res.send(req.session.testid+req.session.user.username+(req.session.user.count++));

}

exports.st2=function(req,res){
    res.send(req.session.testid+="1");
}
