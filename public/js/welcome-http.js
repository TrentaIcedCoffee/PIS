// angular controller register
$(document).ready(function() {
    var app = angular.module('app', []);
    // signup http
    app.controller('controller-signup', function($scope, $http) {
        // ini deptNameChoices, visaTypeChoices
        $scope.deptNameChoices = deptNames;
        $scope.visaTypeChoices = visaTypes;
        $scope.signup = function() {
            // form validation
            $('#error-invalid_signup').hide();
            if (!signupValidate()) {
                $('#error-invalid_signup').show();
                return;
            }
            // extract data
            var dataUser = dataUserInScope($scope);
            // http
            $http({
                method: 'POST',
                url: `users`,
                data: dataUser
            }).then(function(res) {
                var user = res.data;
                document.cookie = cookieOf('usr', jwtOf(`{email: "${user.email}"}`, user._id));
                window.location.replace('ui.html');
            }, function(err) {
                throw err;
            });
        };
    });
    // login http
    app.controller('controller-login', function($scope, $http) {
        $scope.login = function() {
            $('.error-login').hide();
            var key = keyInScope($scope);
            $http({
                method: 'POST',
                url: 'login',
                data: key
            }).then(function(res) {
                if (!res.data._id) {
                    $('#error-incorrect').show();
                } else {
                    document.cookie = cookieOf('usr', jwtOf(`{email: "${key.email}"}`, res.data._id));
                    window.location.replace('ui.html');
                }
            }, function(err) {
                throw err;
            });
        };
    });
});
