import _ from 'lodash'  // lodash工具库


function titlesCopy(formData, titles) {

    var _TimuList = [];
    // console.log(titles);
    var _formData = _.clone(formData);
    for (let index = 0; index < titles.length; index++) {
        // 显示题目
        _.forOwn(_formData, (value, key) => {
            _formData[key] = titles[index][key];
        });
        _TimuList.push(_.clone(_formData));
    }
    return _TimuList;
}

export {titlesCopy}