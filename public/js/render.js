// private-basic
var h2PrivateBasic = function() {
    return '<h2 class="express express-medium">Basic Info</h2>';
};

var inputPrivateBasic = function(token, value) {
    var result = '';
    result += '<div class="input-group">';
    result += `<span class="input-group-addon"><i class="glyphicon glyphicon-${token}"></i></span>`;
    result += `<input class="form-control interact" readonly="readonly" value="${value}" />`;
    result += '</div>';
    return result;
}

var btnPrivateBasic = function(type, target, value) {
    var result = '';
    result += '<div class="input-group">';
    result += `<button class="btn btn-${type} btn-full interact" data-toggle="modal" data-target="${target}" type="button">${value}</button>`
    result += '</div>';
    return result;
};

var privateBasic = function(user) {
    var result = '';
    result += '<div id="private-basic">';
    result += h2PrivateBasic();
    result += inputPrivateBasic('user', user.email);
    result += inputPrivateBasic('calendar', user.stop_time);
    result += btnPrivateBasic('warning', '#model-change_password', 'Change password');
    result += btnPrivateBasic('danger', '#model-delete_user', 'Delete this user');
    result += '</div>';
    return result;
}

// private-general
var h2PrivateGeneral = function() {
    return '<h2 class="express express-medium"><span><button class="btn btn-primary" onclick="toggleGeneralInfoLock()"><i class="glyphicon glyphicon-lock"></i></button></span>&nbsp;&nbsp;&nbsp;&nbsp;General Info</h2>';
};

var inputPrivateGeneral = function(token, value) {
    var result = '';
    result += '<div class="input-group">';
    result +=  `<span class="input-group-addon"><i class="glyphicon glyphicon-${token}"></i></span>`;
    result += `<input class="form-control interact" readonly="readonly" onchange="updateGeneralInfo()" value="${value}" />`;
    result += '</div>';
    return result;
};

var privateGeneral = function(user) {
    var result = '';
    result += '<div id="private-general">';
    result += h2PrivateGeneral();
    result += inputPrivateGeneral('user', user.name);
    result += inputPrivateGeneral('phone', user.phone);
    result += inputPrivateGeneral('envelope', (user.working_email || ''));
    result += inputPrivateGeneral('comment', (user.note || ''));
    result += '</div>';
    return result;
}

// private-depts_and_visas
var h2PrivateDeptsAndVisas = function() {
    return '<h2 class="express express-medium"><span><button class="btn btn-primary" data-toggle="modal" data-target="#model-update_depts_and_visas"><i class="glyphicon glyphicon-edit"></i></button></span>&nbsp;&nbsp;&nbsp;&nbsp;Departments and Visas</h2>';
};

var dropdownPrivateDeptsAndVisas = function(label, data) {
    var result = '';
    result += '<div class="input-group clearfix">';
    result += `<button class="btn btn-info btn-full dropdown-toggle interact" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${label}<span class="caret"></span></button>`;
    result += '<ul class="dropdown-menu ul-wide ul-responsive">';
    result += `<li class="dropdown-header express-inverse express-small">${label}</li>`;
    for (var val of data) {
        result += `<li class="interact">${val}</li>`;
    }
    result += '</ul>';
    result += '</div>';
    return result;
};

var privateDeptsAndVisas = function(user) {
    var result = '';
    result += '<div id="private-depts_and_visas">';
    result += h2PrivateDeptsAndVisas();
    result += dropdownPrivateDeptsAndVisas('Departments', user.dept_names);
    result += dropdownPrivateDeptsAndVisas('Visas', user.visa_types);
    result += '</div>';
    return result;
};

// private-supervisor
var h2PrivateSupervisor = function() {
    return '<h2 class="express express-medium"><span><button class="btn btn-primary" onclick="toggleSupervisorLock()"><i class="glyphicon glyphicon-lock"></i></button></span>&nbsp;&nbsp;&nbsp;&nbsp;Supervisor Info</h2>';
};

var inputPrivateSupervisor = function(token, value) {
    var result = '';
    result += '<div class="input-group">';
    result += `<span class="input-group-addon"><i class="glyphicon glyphicon-${token}"></i></span>`;
    result += `<input class="form-control interact" readonly="readonly" onchange="updateSupervisor()" value="${value}" />`;
    result += '</div>';
    return result;
};

var privateSupervisor = function(user) {
    var result = '';
    result += '<div id="private-supervisor">';
    result += h2PrivateSupervisor();
    result += inputPrivateSupervisor('user', (user.supervisor_name || ''));
    result += inputPrivateSupervisor('envelope', (user.supervisor_email || ''));
    result += '</div>';
    return result;
};

// private-info
var privateInfo = function(user) {
    var result = '';
    result += privateBasic(user);
    result += privateGeneral(user);
    result += privateDeptsAndVisas(user);
    result += privateSupervisor(user);
    return result;
};

// public-info
var td = function(value) {
    if (typeof value == 'string') {
        return `<td class="interact">${value}</td>`;
    } else {
        return `<td class="interact">${value.join(',<br />')}</td>`;
    }
};

var tr = function(user) {
    var result = '';
    result += '<tr>';
    result += td(user.name);
    result += td(user.phone);
    result += td(user.email);
    result += td(user.working_email || '');
    result += td(user.dept_names);
    result += td(user.visa_types);
    result += td(user.supervisor_name || '');
    result += td(user.supervisor_email || '');
    result += '</tr>';
    if (user.note) {
        result += '<tr>';
        result += `<td class="note-public" colspan="8">Note: ${user.note}</td>`;
        result += '</tr>';
    }
    return result;
}

var publicInfo = function(users, filter) {
    var usersSelected = filter(users);
    var result = '';
    for (var user of usersSelected) {
        result += tr(user);
    }
    return result;
}
