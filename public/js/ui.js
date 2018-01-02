'use strict'

// origin extends
String.prototype.contains = function(that) {
    return this.indexOf(that) != -1;
};
String.prototype.containsIgnoreCase = function(that) {
    var thisLowerCase = this.toLowerCase();
    var thatLowerCase = that.toLowerCase();
    return thisLowerCase.indexOf(thatLowerCase) != -1;
};
Array.prototype.containsStr = function(str) {
    for (var thisStr of this) {
        if (thisStr.containsStr(str)) {
            return true;
        }
    }
    return false;
};
Array.prototype.containsStrIgnoreCase = function(str) {
    for (var thisStr of this) {
        if (thisStr.containsIgnoreCase(str)) {
            return true;
        }
    }
    return false;
};

// search and query
var isSearchedFactory = function(text) {
    // no search text
    if (text == null || text == undefined || text == '') {
        return function(user) {
            return true;
        };
    }

    var isSearched = function(user) {
        var result = false;
        for (var index in user) {
            if (index == '_id') {
                continue;
            }

            if (user[index] == null || user[index] == undefined) {
            } else if (typeof user[index] == 'string') {
                if (user[index].containsIgnoreCase(text)) {
                    result = true;
                    return result;
                }
            } else if (typeof user[index] == 'object') {
                if (user[index].containsStrIgnoreCase(text)) {
                    result = true;
                    return result;
                }
            } else {
                throw new DebugException();
            }
        }
        return result;
    };
    return isSearched;
};
// search(this.value)
var search = function(text) {
    var isSearched = isSearchedFactory(text);
    var divPublicInfo = $('#public-info');
    divPublicInfo.html(publicInfo(users, function(users) {
        return users.filter(isSearched);
    }));
    divPublicInfo.unhighlight();
    divPublicInfo.highlight(text);
};
var isQueriedFactory = function(text, index) {
    // no query text
    if (text == null || text == undefined || text == '') {
        return function(user) {
            return true;
        };
    }

    var isQueried = function(user) {
        var result = false;
        if (user[index] == null || user[index] == undefined) {
        } else if (typeof user[index] == 'string') {
            if (user[index].containsIgnoreCase(text)) {
                result = true;
                return result;
            }
        } else if (typeof user[index] == 'object') {
            if (user[index].containsStrIgnoreCase(text)) {
                result = true;
                return result;
            }
        } else {
            throw new DebugException();
        }
        return result;
    };
    return isQueried;
};
// query(this.value, 'name')
var query = function(text, index) {
    var isQueried = isQueriedFactory(text, index);
    var divPublicInfo = $('#public-info');
    divPublicInfo.html(publicInfo(users, function(users) {
        return users.filter(isQueried);
    }));
};

// privateInfo
var togglePrivateInfo = function(ele) {
    var trigger = $(ele);
    var privateInfo = $('#private-info');
    if (trigger.hasClass('active')) {
        trigger.removeClass('active');
        privateInfo.slideUp();
    } else {
        trigger.addClass('active');
        privateInfo.slideDown();
    }
};
var toggleGeneralInfoLock = function() {
    var token = $('#private-general h2 button i');
    var input = $('#private-general input');
    if (token.hasClass('glyphicon-lock')) {
        token.removeClass('glyphicon-lock');
        token.addClass('glyphicon-edit');
        input.prop('readonly', false);
    } else {
        token.removeClass('glyphicon-edit');
        token.addClass('glyphicon-lock');
        input.prop('readonly', true);
    }
};
var getGeneralInfo = function() {
    var valueArray = $('#private-general input').map(function() {
        return this.value;
    }).get();
    var dataInput = {
        name: valueArray[0],
        phone: valueArray[1],
        working_email: valueArray[2],
        note: valueArray[3]
    };
    return dataInput;
};
var toggleSupervisorLock = function() {
    var token = $('#private-supervisor h2 button i');
    var input = $('#private-supervisor input');
    if (token.hasClass('glyphicon-lock')) {
        token.removeClass('glyphicon-lock');
        token.addClass('glyphicon-edit');
        input.prop('readonly', false);
    } else {
        token.removeClass('glyphicon-edit');
        token.addClass('glyphicon-lock');
        input.prop('readonly', true);
    }
};
var getSupervisorInfo = function() {
    var valueArray = $('#private-supervisor input').map(function() {
        return this.value;
    }).get();
    var dataInput = {
        supervisor_name: valueArray[0],
        supervisor_email: valueArray[1]
    };
    return dataInput;
};

// delete user
$(document).ready(function() {
    $('#span-user_email').text(user.email);
});
var confirmEmail = function(ele) {
    var btnDeleteUser = $('#btn-delete_user');
    if (ele.value == user.email) {
        btnDeleteUser.prop('disabled', false);
    } else {
        btnDeleteUser.prop('disabled', true);
    }
};
