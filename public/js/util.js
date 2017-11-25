// TODO test with data
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
    emails = [];
    for (var val of users) {
        emails.push(val.email);
    }
    return emails;
};

var validateUser = function(users, key, okCallback, noUserCallback, wrongPasswordCallback) {
    user = users.filter(function(item) {
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
        depts: $scope.inputDeptNames,
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

// TODO test with data
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
