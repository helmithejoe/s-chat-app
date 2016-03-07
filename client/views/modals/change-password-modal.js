Template.changePasswordModal.events({
    'click .js-change-password'(e) {
        e.preventDefault();
        const tmpl = Template.instance();
        const oldPassword = tmpl.$('.js-change-pass-old').val();
        const newPassword = tmpl.$('.js-change-pass-new').val();
        if (oldPassword && newPassword) {
            Accounts.changePassword(oldPassword, newPassword, (err) => {
                if (!err) {
                    sAlert.success('Password changed!', {offset: 50});
                    sChatModal.close();
                } else {
                    sAlert.error('Someting went wrong. Details: ' + err, {offset: 50});
                }
            });
        }
    }
});