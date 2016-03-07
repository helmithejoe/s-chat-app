Template.header.events({
    'click .js-logout'(e) {
        e.preventDefault();
        Meteor.logout();
        Meteor.setTimeout(() => {
            FlowRouter.go('/');
        });
    },
    'click .js-change-password'(e) {
        e.preventDefault();
        sChatModal.open('changePasswordModal');
    },
    'click .js-remove-account'(e) {
        e.preventDefault();
        sChatModal.open('removeAccountModal');
    },
    'click .js-toggle-mobile-menu'(e) {
        e.preventDefault();
        const tmpl = Template.instance();
        const state = tmpl.isMobileMenuVisible.get();
        tmpl.isMobileMenuVisible.set(!state);
    }
});

Template.header.onCreated(function () {
    this.isMobileMenuVisible = new ReactiveVar(false);
});
Template.header.helpers({
    isMobileMenuVisible() {
        const tmpl = Template.instance();
        return tmpl.isMobileMenuVisible.get();
    }
});

Template.main.onCreated(function () {
    this.subscribe('Meteor.users.emailNotifications');
});

Template.main.helpers({
    isModalActive() {
        return sChatModal.active.get();
    },
    promoPage() {
        return FlowRouter.getRouteName() === 'promoIndex';
    },
    docsPage() {
        return FlowRouter.getRouteName() === 'docs';
    }
});

Template.footer.events({
    'click .js-docs-link': App.goToTheDocsSection
});