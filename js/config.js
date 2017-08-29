/**
 * @Author:冯大双
 * @Date:2017/6/8
 * @Desc: 后台地址配置
 */
var environment = 'dev';
//var environment = 'prod';
var ipp;
var pictureRead;
if ('prod' == environment) {
    ipp = 'http://106.15.183.25:8090';
    pictureRead = 'http://106.15.183.25:8888/';

} else if ('dev' == environment) {
    ipp = 'http://192.168.10.73:8090';
    pictureRead = 'http://192.168.10.73:8888/';
}
;
baseurl = {
    subrecordinfo: ipp + '/api/recordinfo/',
    subuserinfo: ipp + '/api/userinfo/',
    subrecordcomment: ipp + '/api/recordcomment/',
    subbaiduface: ipp + '/api/baiduface/',
    subuserandgood: ipp + '/api/userandgood/',
    subusercollect: ipp + '/api/usercollect/'
};

/*文件上传*/
fileUrl = {
    upload: ipp + '/upload',
}

/*动态记录*/
recordinfo = {
    save: baseurl.subrecordinfo + 'save',
    getlist: baseurl.subrecordinfo + 'getlist',
    getmylist: baseurl.subrecordinfo + 'getmylist',
    details: baseurl.subrecordinfo + 'details',
    delete: baseurl.subrecordinfo + 'delete'
}
/*用户*/
userinfo = {
    registeruser: baseurl.subuserinfo + 'register',
    login: baseurl.subuserinfo + 'login',
    checkusername: baseurl.subuserinfo + 'checkusername',
    isface: baseurl.subuserinfo + 'isface',
    checkphone: baseurl.subuserinfo + 'checkphone',
    sendmessage: baseurl.subuserinfo + 'sendmessage',
    forgetpassword:baseurl.subuserinfo + 'forgetpassword',
    editpassword:baseurl.subuserinfo + 'editpassword'
}

/*动态记录评论*/
recordcomment = {
    save: baseurl.subrecordcomment + 'save',
}

/*用户点赞*/
userandgood = {
    save: baseurl.subuserandgood + 'clickgood',
}

/*用户收藏*/
usercollect = {
    save: baseurl.subusercollect + 'collect',
}

/*百度人脸识别*/
baiduface = {
    register: baseurl.subbaiduface + 'register',
    identify: baseurl.subbaiduface + 'identify',
    update: baseurl.subbaiduface + 'update'
}