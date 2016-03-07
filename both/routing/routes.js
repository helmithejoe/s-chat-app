// handle routes with FlowRouter Meteor package
FlowRouter.route('/apps', {
    triggersEnter: [(context, redirect) => {
        if (!Meteor.userId()) {
            redirect('/');
        }
    }],
    name: 'clientAppList',
    action() {
        BlazeLayout.render('main', {layout: 'clientAppList'});
    }
});

FlowRouter.route('/', {
    triggersEnter: [(context, redirect) => {
        if (Meteor.userId()) {
            redirect('/apps');
        }
    }],
    name: 'promoIndex',
    action() {
        BlazeLayout.render('main', {layout: 'promoIndex'});
    }
});

FlowRouter.route('/docs', {
    name: 'docs',
    action() {
        BlazeLayout.render('main', {layout: 'docs'});
    }
});

FlowRouter.route('/client/:clientAppId', {
    triggersEnter: [(context, redirect) => {
        if (!Meteor.userId()) {
            redirect('/');
        }
    }],
    name: 'clientAppView',
    action() {
        BlazeLayout.render('main', {layout: 'clientAppView'});
    }
});

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('main', {layout: 'notFoundPage'});
    }
};



// s-id accounts
// see more at: http://s-id.meteor.com

FlowRouter.route('/login', {
    triggersEnter: [(context, redirect) => {
        if (Meteor.userId()) {
            redirect('/apps');
        }
    }],
    name: 'sIdLoginView',
    action() {
        BlazeLayout.render('main', {layout: 'sIdLoginView'});
    }
});
FlowRouter.route('/sign-up', {
    triggersEnter: [(context, redirect) => {
        if (Meteor.userId()) {
            redirect('/apps');
        }
    }],
    name: 'sIdRegisterView',
    action() {
        BlazeLayout.render('main', {layout: 'sIdRegisterView'});
    }
});
FlowRouter.route('/forgot-password', {
    name: 'sIdForgotPasswordView',
    action() {
        BlazeLayout.render('main', {layout: 'sIdForgotPasswordView'});
    }
});
FlowRouter.route('/reset-password/:resetToken', {
    triggersEnter: [(context, redirect) => {
        if (Meteor.userId()) {
            redirect('/apps');
        }
    }],
    name: 'sIdResetPasswordView',
    action() {
        BlazeLayout.render('main', {layout: 'sIdResetPasswordView'});
    }
});

// handle redirect after logout
if (Meteor.isClient) {
    Tracker.autorun(function () {
        if (!Meteor.userId() && _.contains(['clientAppView', 'clientAppList'], FlowRouter.getRouteName())) {
            FlowRouter.go('/');
        }
        if (Meteor.userId() && _.contains(['promoIndex'], FlowRouter.getRouteName())) {
            FlowRouter.go('/apps');
        }
    });
    // clear opened modals on route change
    FlowRouter.triggers.exit([function () {
        if (sChatModal.active.get()) {
            sChatModal.close();
        }
    }]);
}


