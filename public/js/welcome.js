// switch function
var signupToLogin = function() {
    $('div[ng-controller="controller-signup"]').hide();
    $('div[ng-controller="controller-login"]').show();
};
var loginToSignup = function() {
    $('div[ng-controller="controller-signup"]').show();
    $('div[ng-controller="controller-login"]').hide();
};
// switch anchor setup
$(document).ready(function() {
    $('#anchor-signup_to_login').click(function() {
        signupToLogin();
    });
    $('#anchor-login_to_signup').click(function() {
        loginToSignup();
    });
});

// daterangepicker setup
$(document).ready(function() {
    // ini time, ini daterangepicker input
    var curTime = new Time();
    var endTime = new Time(curTime).setMonthGap(6);
    var maxTime = new Time(curTime).setYearGap(1);
    $('#input-stop_time').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD'
        },
        singleDatePicker: true,
        startDate: endTime.getDate(), // startDate == endDate, both used as endDate with startDate fixed
        endDate: endTime.getDate(),
        minDate: curTime.getDate(),
        maxDate: maxTime.getDate()
    });
    // daterangepicker botton function
    setMonthGap = function(months) {
        var endTime = new Time(curTime);
        endTime.setMonthGap(months);
        var dateRangePicker = $('#input-stop_time').data('daterangepicker');
        dateRangePicker.setStartDate(endTime.getDate());
        dateRangePicker.setEndDate(endTime.getDate());
    };
});

// signup input check setup
$(document).ready(function() {
    $('#input-email').change(function() {
        $('#field-email .error').hide();
        if ($('#input-email').val().length == 0) {
            $('#error-empty_email').show();
        } else if (!isValidEmail($('#input-email').val())) {
            $('#error-invalid_email').show();
        } else if ($.inArray($('#input-email').val(), emails) != -1) {
            $('#error-email_exists').show();
        }
    });
    $('#input-password').change(function() {
        $('#field-password .error').hide();
        if ($('#input-password').val().length == 0) {
            $('#error-empty_password').show();
        } else if (!isValidPassword($('#input-password').val())) {
            $('#error-short_password').show();
        }
    });
    $('#input-password-retype').change(function() {
        $('#field-password-retype .error').hide();
        if ($('#input-password-retype').val() != $('#input-password').val()) {
            $('#error-password_mismatch').show();
        }
    });
    $('#input-name').change(function() {
        $('#field-name .error').hide();
        if ($('#input-name').val().length == 0) {
            $('#error-empty_name').show();
        }
    });
    $('#input-phone').change(function() {
        $('#field-phone .error').hide();
        if ($('#input-phone').val().length == 0) {
            $('#error-empty_phone').show();
        }
    });
    $('#input-stop_time').change(function() {
        $('#field-stop_time .error').hide();
        if ($('#input-stop_time').val().length == 0) {
            $('#error-empty_stop_time').show();
        }
    });
    $('#select-dept_names').change(function() {
        $('#field-dept_names .error').hide();
        if ($('#select-dept_names').val() == null) {
            $('#error-empty_dept_names').show();
        }
    });
    $('#select-visa_types').change(function() {
        $('#field-visa_types .error').hide();
        if ($('#select-visa_types').val() == null) {
            $('#error-empty_visa_types').show();
        }
    });
    $('#input-working_email').change(function() {
        $('#field-working_email .error').hide();
        if ($('#input-working_email').val() != '' && !isValidEmail($('#input-working_email').val())) {
            $('#error-invalid_working_email').show();
        }
    });
    $('#input-supervisor_email').change(function() {
        $('#field-supervisor_email .error').hide();
        if ($('#input-supervisor_email').val() != '' && !isValidEmail($('#input-supervisor_email').val())) {
            $('#error-invalid_supervisor_email').show();
        }
    });
});

// signup whole check function
var signupValidate = function() {
    $('.error').hide();

    var isValidSignup = true;

    if ($('#input-email').val().length == 0) {
        $('#error-empty_email').show();
        isValidSignup = false;
    } else if (!isValidEmail($('#input-email').val())) {
        $('#error-invalid_email').show();
        isValidSignup = false;
    } else if ($.inArray($('#input-email').val(), emails) != -1) {
        $('#error-email_exists').show();
        isValidSignup = false;
    }
    if ($('#input-password').val().length == 0) {
        $('#error-empty_password').show();
        isValidSignup = false;
    } else if (!isValidPassword($('#input-password').val())) {
        $('#error-short_password').show();
        isValidSignup = false;
    }
    if ($('#input-password-retype').val() != $('#input-password').val()) {
        $('#error-password_mismatch').show();
        isValidSignup = false;
    }
    if ($('#input-name').val().length == 0) {
        $('#error-empty_name').show();
        isValidSignup = false;
    }
    if ($('#input-phone').val().length == 0) {
        $('#error-empty_phone').show();
        isValidSignup = false;
    }
    if ($('#input-stop_time').val().length == 0) {
        $('#error-empty_stop_time').show();
        isValidSignup = false;
    }
    if ($('#select-dept_names').val() == null) {
        $('#error-empty_dept_names').show();
        isValidSignup = false;
    }
    if ($('#select-visa_types').val() == null) {
        $('#error-empty_visa_types').show();
        isValidSignup = false;
    }
    if ($('#input-working_email').val() != '' && !isValidEmail($('#input-working_email').val())) {
        $('#error-invalid_working_email').show();
        isValidSignup = false;
    }
    if ($('#input-supervisor_email').val() != '' && !isValidEmail($('#input-supervisor_email').val())) {
        $('#error-invalid_supervisor_email').show();
        isValidSignup = false;
    }

    return isValidSignup;
};
