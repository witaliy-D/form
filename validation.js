$(document).ready(function () {

    let feedbackName = $("#feedback-name"),
        feedbackTel = $('#feedback-tel'),
        reviewName = $('#review-name'),
        reviewEmail = $('#review-email'),
        reviewText = $('#review-text'),

         regTel = /^\+?[\d() -]{6,18}$/,
         regEmail = /^\w+([.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i,
         regAll = /(.|\n)*/,

         elemName = 'name',
         elemTel = 'tel',
         elemEmail = 'email',
         elemText = 'text',

         msg_1_name = 'Поле имя обязательно к заполнению',
         msg_1_tel = 'Поле телефон обязательно к заполнению',
         msg_1_email = 'Поле e-mail обязательно к заполнению',
         msg_1_text = 'Обязательное поле',

         no_msg = '',
         msg_2_tel = 'Вы указали недопустимый телефон',
         msg_2_email = 'Вы указали недопустимый e-mail';



    function ValidateElem (el, reg, elem, msg_1, msg_2) {

        this.validate = function () {

            if ($.trim(el.val()) === '' ) {
                this.errors = true;
                el.siblings(".text-error").remove();
                el.after('<span class="text-error for-' + elem + '">' + msg_1 + '</span>');
                $('.for-' + elem).css({top: el.position().top + el.outerHeight() + 2});
                el.addClass('danger').removeClass('correct');
            } else if (!reg.test($.trim(el.val() ) ) ) {
                this.errors = true;
                el.siblings(".text-error").remove();
                el.after('<span class="text-error for-' + elem + '">' + msg_2 + '</span>');
                $('.for-' + elem).css({top: el.position().top + el.outerHeight() + 2});
                el.addClass('danger').removeClass('correct');
            } else {
                this.errors = false;
                el.siblings(".text-error").remove();
                el.removeClass('danger').addClass('correct');
            }
            return this.errors;
        }
    }


    const vFeedbackName = new ValidateElem(feedbackName, regAll, elemName, msg_1_name, no_msg);
    const vFeedbackTel = new ValidateElem(feedbackTel, regTel, elemTel, msg_1_tel, msg_2_tel);

    const vReviewName = new ValidateElem(reviewName, regAll, elemName, msg_1_name, no_msg);
    const vReviewEmail = new ValidateElem(reviewEmail, regEmail, elemEmail, msg_1_email, msg_2_email);
    const vReviewText = new ValidateElem(reviewText, regAll, elemText, msg_1_text, no_msg);


    feedbackName.change(vFeedbackName.validate);
    feedbackTel.change(vFeedbackTel.validate);

    reviewName.change(vReviewName.validate);
    reviewEmail.change(vReviewEmail.validate);
    reviewText.change(vReviewText.validate);


    $("#form-feedback").submit(function() {

        let url = '?feedback=1',
            divSuccess = $('#feedback-success'),
            divForm = $(this),
            data = divForm.serialize();

        vFeedbackName.validate();
        vFeedbackTel.validate();

        if (!vFeedbackName.validate() && !vFeedbackTel.validate()) {
            sendMail(url, data, divForm, divSuccess);
        }
        return false;
    });

    $('#form-review').submit(function() {

        let url = '?review=1',
            divSuccess = $('#review-success'),
            divForm = $(this),
            data = divForm.serialize();

        vReviewName.validate();
        vReviewEmail.validate();
        vReviewText.validate();

        if (!vReviewName.validate() && !vReviewEmail.validate() && !vReviewText.validate()) {
            sendMail(url, data, divForm, divSuccess);
        }
        return false;
    });

    function sendMail(url, data, divForm, divSuccess) {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'sendMail.php' + url,
            data: data,
            success: function(json) {
                let prefix = json['form'];
                if(json['success']) {
                    divForm.fadeOut(600, function () {
                        divSuccess.fadeIn(600);
                    });
                    divForm[0].reset();
                    $('#form-' + prefix + ' .correct').removeClass('correct');
                }
            }
        })
    }

    $('.success-close').click(function () {
        let form = $(this).parent().siblings();
        $(this).parent().fadeOut(600, function () {
           form.fadeIn(600);
        })
    })

});