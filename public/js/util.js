'use strict'

var getIdOfEmail = function(email) {
    var users = JSON.parse($.ajax({url: 'users', async: false, dataType: 'json'}).responseText).filter(function(user) {
        return user.email == email;
    });
    if (users.length > 1) {
        throw new DebugException();
    }
    var user = users[0];
    return user._id;
};

var getJwtInCookie = function(cookie) {
    var jwt = undefined;
    var decodedCookie = decodeURIComponent(document.cookie);
    var decodedCookieArray = decodedCookie.split(';');
    for (var decodedCookieStr of decodedCookieArray) {
        if (decodedCookieStr.length >= 4 && decodedCookieStr.substring(0, 4) == 'usr=') {
            jwt = decodedCookieStr.substring(4);
        }
    }
    return jwt;
};

var cookieOf = function(cname, cvalue) {
    return `${cname}=${cvalue};`;
};

var nameOf = function(depts) {
    var deptNames = [];
    for (var dept of depts) {
        deptNames.push(dept.name);
    }
    return deptNames;
};

var usersToEmails = function(users) {
    var emails = [];
    users.forEach(function(user) {
        emails.push(user['email']);
    });
    return emails;
};

var visasToVisaNames = function(visas) {
    var visaNames = [];
    visas.forEach(function(visa) {
        visaNames.push(visa['name']);
    });
    return visaNames;
};

var deptsToDeptNames = function(depts) {
    var deptNames = [];
    depts.forEach(function(dept) {
        deptNames.push(dept['name']);
    });
    return deptNames;
};

var validateUser = function(users, key, okCallback, noUserCallback, wrongPasswordCallback) {
    var user = users.filter(function(item) {
        return item.email == key.email;
    });
    if (user.length == 0) {
        noUserCallback();
    } else if (user[0].password != key.password) {
        wrongPasswordCallback();
    } else {
        okCallback(user[0].email, user[0]._id);
    }
};

var dataDeptInScope = function($scope) {
    return {
        name: $scope.name,
        college: $scope.college,
        cluster: $scope.cluster
    };
};

var dataUserInScope = function($scope) {
    return {
        email: $scope.inputEmail,
        password: $scope.inputPassword,
        name: $scope.inputName,
        phone: $scope.inputPhone,
        stop_time: $scope.inputStopTime,
        dept_names: $scope.inputDeptNames,
        visa_types: $scope.inputVisaTypes,
        working_email: $scope.inputWorkingEmail,
        supervisor_name: $scope.inputSupervisorName,
        supervisor_email: $scope.inputSupervisorEmail,
        note: $scope.inputNote
    };
};

var keyInScope = function($scope) {
    return {
        email: $scope.inputEmail,
        password: $scope.inputPassword
    };
};

var isValidId = function(id) {
    // id.length == 24
    return id.length == 24;
};

// RFC 2822 simplified form, credit to Esteban Kuber
var isValidEmail = function(email) {
    // email in regex
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
};

var isValidPassword = function(password) {
    // password.length >= 6
    return password.length >= 6;
};

var isValidArray = function(array) {
    return typeof array === 'object' && array.length > 0;
};
