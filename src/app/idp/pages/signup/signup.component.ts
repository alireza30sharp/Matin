import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '@services';
import { SelectOptionInterface } from '@share/interfaces/select-option.interface';
import { ToastService } from '@share/services';
import { AuthVMService } from '@share/services/auth-vm.service';
import { companyInterFace } from 'src/app/company/models';
import { CompanyService } from 'src/app/company/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [CompanyService],
})
export class SignupComponent implements OnInit {
  signupLoading = false;
  cityOptions?: SelectOptionInterface<any>[];

  city = [
    { label: 'آبادان', value: 'آبادان' },
    { label: 'آباده', value: 'آباده' },
    { label: 'آباده طشک', value: 'آباده طشک' },
    { label: 'آبدانان', value: 'آبدانان' },
    { label: 'آبیک', value: 'آبیک' },
    { label: 'آذرشهر', value: 'آذرشهر' },
    { label: 'آرادان', value: 'آرادان' },
    { label: 'آران و بیدگل', value: 'آران و بیدگل' },
    { label: 'اراک', value: 'اراک' },
    { label: 'اردبیل', value: 'اردبیل' },
    { label: 'اردستان', value: 'اردستان' },
    { label: 'اردکان', value: 'اردکان' },
    { label: 'ارومیه', value: 'ارومیه' },
    { label: 'ازنا', value: 'ازنا' },
    { label: 'استهبان', value: 'استهبان' },
    { label: 'اسدآباد', value: 'اسدآباد' },
    { label: 'اسدیه', value: 'اسدیه' },
    { label: 'اسفراین', value: 'اسفراین' },
    { label: 'اسلام‌آبادغرب', value: 'اسلام‌آبادغرب' },
    { label: 'اسلام‌شهر', value: 'اسلام‌شهر' },
    { label: 'اشتهارد', value: 'اشتهارد' },
    { label: 'اشکذر', value: 'اشکذر' },
    { label: 'اشنویه', value: 'اشنویه' },
    { label: 'اهر', value: 'اهر' },
    { label: 'اهواز', value: 'اهواز' },
    { label: 'ایلام', value: 'ایلام' },
    { label: 'ایوانکی', value: 'ایوانکی' },
    { label: 'باغ بهادران', value: 'باغ بهادران' },
    { label: 'بازفت', value: 'بازفت' },
    { label: 'بازند', value: 'بازند' },
    { label: 'باغملک', value: 'باغملک' },
    { label: 'بافق', value: 'بافق' },
    { label: 'بافران', value: 'بافران' },
    { label: 'بانه', value: 'بانه' },
    { label: 'بجنورد', value: 'بجنورد' },
    { label: 'بروجرد', value: 'بروجرد' },
    { label: 'بابل', value: 'بابل' },
    { label: 'بابلسر', value: 'بابلسر' },
    { label: 'بستان', value: 'بستان' },
    { label: 'بندر انزلی', value: 'بندر انزلی' },
    { label: 'بندر ماهشهر', value: 'بندر ماهشهر' },
    { label: 'بندر دیلم', value: 'بندر دیلم' },
    { label: 'بندر امام خمینی', value: 'بندر امام خمینی' },
    { label: 'بندر گز', value: 'بندر گز' },
    { label: 'بندر لنگه', value: 'بندر لنگه' },
    { label: 'بندرعباس', value: 'بندرعباس' },
    { label: 'بندر ماهشهر', value: 'بندر ماهشهر' },
    { label: 'بندر چارک', value: 'بندر چارک' },
    { label: 'بهبهان', value: 'بهبهان' },
    { label: 'بهشهر', value: 'بهشهر' },
    { label: 'بوشهر', value: 'بوشهر' },
    { label: 'بوئین زهرا', value: 'بوئین زهرا' },
    { label: 'بیله سوار', value: 'بیله سوار' },
    { label: 'پارس آباد', value: 'پارس آباد' },
    { label: 'پاکدشت', value: 'پاکدشت' },
    { label: 'پاوه', value: 'پاوه' },
    { label: 'پردیس', value: 'پردیس' },
    { label: 'پل دختر', value: 'پل دختر' },
    { label: 'پل سفید', value: 'پل سفید' },
    { label: 'پلدختر', value: 'پلدختر' },
    { label: 'پیرانشهر', value: 'پیرانشهر' },
    { label: 'تالش', value: 'تالش' },
    { label: 'تربت جام', value: 'تربت جام' },
    { label: 'تبریز', value: 'تبریز' },
    { label: 'تربت حیدریه', value: 'تربت حیدریه' },
    { label: 'تربت حیدریه', value: 'تربت حیدریه' },
    { label: 'ترکمن', value: 'ترکمن' },
    { label: 'تنکابن', value: 'تنکابن' },
    { label: 'تهران', value: 'تهران' },
    { label: 'جویبار', value: 'جویبار' },
    { label: 'جیرفت', value: 'جیرفت' },
    { label: 'جلفا', value: 'جلفا' },
    { label: 'جهرم', value: 'جهرم' },
    { label: 'جوین', value: 'جوین' },
    { label: 'چابهار', value: 'چابهار' },
    { label: 'چالوس', value: 'چالوس' },
    { label: 'چایپاره', value: 'چایپاره' },
    { label: 'چرام', value: 'چرام' },
    { label: 'چرمهین', value: 'چرمهین' },
    { label: 'چلیچه', value: 'چلیچه' },
    { label: 'چناران', value: 'چناران' },
    { label: 'چوبر', value: 'چوبر' },
    { label: 'حسینیه', value: 'حسینیه' },
    { label: 'حاجی آباد', value: 'حاجی آباد' },
    { label: 'حویق', value: 'حویق' },
    { label: 'خاش', value: 'خاش' },
    { label: 'خرامه', value: 'خرامه' },
    { label: 'خرم آباد', value: 'خرم آباد' },
    { label: 'خرمدره', value: 'خرمدره' },
    { label: 'خرمشهر', value: 'خرمشهر' },
    { label: 'خشت', value: 'خشت' },
    { label: 'خلخال', value: 'خلخال' },
    { label: 'خلیل‌آباد', value: 'خلیل‌آباد' },
    { label: 'خمین', value: 'خمین' },
    { label: 'خمینی‌شهر', value: 'خمینی‌شهر' },
    { label: 'خواف', value: 'خواف' },
    { label: 'خوانسار', value: 'خوانسار' },
    { label: 'خوی', value: 'خوی' },
    { label: 'خور', value: 'خور' },
    { label: 'خورزوق', value: 'خورزوق' },
    { label: 'دالاهو', value: 'دالاهو' },
    { label: 'دامغان', value: 'دامغان' },
    { label: 'درگز', value: 'درگز' },
    { label: 'دره‌شهر', value: 'دره‌شهر' },
    { label: 'دشتستان', value: 'دشتستان' },
    { label: 'دشتی', value: 'دشتی' },
    { label: 'دلند', value: 'دلند' },
    { label: 'دیلم', value: 'دیلم' },
    { label: 'رامسر', value: 'رامسر' },
    { label: 'رامهرمز', value: 'رامهرمز' },
    { label: 'رامیان', value: 'رامیان' },
    { label: 'رفسنجان', value: 'رفسنجان' },
    { label: 'رشت', value: 'رشت' },
    { label: 'رودبار', value: 'رودبار' },
    { label: 'رودسر', value: 'رودسر' },
    { label: 'زابل', value: 'زابل' },
    { label: 'زابلی', value: 'زابلی' },
    { label: 'زاهدان', value: 'زاهدان' },
    { label: 'زرند', value: 'زرند' },
    { label: 'زرین‌آباد', value: 'زرین‌آباد' },
    { label: 'زرین‌شهر', value: 'زرین‌شهر' },
    { label: 'زنجان', value: 'زنجان' },
    { label: 'زنوز', value: 'زنوز' },
    { label: 'زیارت', value: 'زیارت' },
    { label: 'زیرکوه', value: 'زیرکوه' },
    { label: 'ساری', value: 'ساری' },
    { label: 'ساوه', value: 'ساوه' },
    { label: 'سپید دشت', value: 'سپید دشت' },
    { label: 'ساقیان', value: 'ساقیان' },
    { label: 'سراب', value: 'سراب' },
    { label: 'سرابله', value: 'سرابله' },
    { label: 'سراوان', value: 'سراوان' },
    { label: 'سرایان', value: 'سرایان' },
    { label: 'سرباز', value: 'سرباز' },
    { label: 'سرپل ذهاب', value: 'سرپل ذهاب' },
    { label: 'سردشت', value: 'سردشت' },
    { label: 'سرعین', value: 'سرعین' },
    { label: 'سرخس', value: 'سرخس' },
    { label: 'سرخون', value: 'سرخون' },
    { label: 'سروآباد', value: 'سروآباد' },
    { label: 'سردشت', value: 'سردشت' },
    { label: 'سلامی', value: 'سلامی' },
    { label: 'سلطانیه', value: 'سلطانیه' },
    { label: 'سلماس', value: 'سلماس' },
    { label: 'سمنان', value: 'سمنان' },
    { label: 'سمیرم', value: 'سمیرم' },
    { label: 'سنندج', value: 'سنندج' },
    { label: 'سوادکوه', value: 'سوادکوه' },
    { label: 'سوق', value: 'سوق' },
    { label: 'سومار', value: 'سومار' },
    { label: 'سومین', value: 'سومین' },
    { label: 'سیاهکل', value: 'سیاهکل' },
    { label: 'سیرجان', value: 'سیرجان' },
    { label: 'سیه چشمه', value: 'سیه چشمه' },
    { label: 'شادگان', value: 'شادگان' },
    { label: 'شاهرود', value: 'شاهرود' },
    { label: 'شاهین‌دژ', value: 'شاهین‌دژ' },
    { label: 'شهرضا', value: 'شهرضا' },
    { label: 'شهرکرد', value: 'شهرکرد' },
    { label: 'شهریار', value: 'شهریار' },
    { label: 'شوش', value: 'شوش' },
    { label: 'شوشتر', value: 'شوشتر' },
    { label: 'شیراز', value: 'شیراز' },
    { label: 'شیروان', value: 'شیروان' },
    { label: 'شیخ بهایی', value: 'شیخ بهایی' },
    { label: 'شیرگاه', value: 'شیرگاه' },
    { label: 'شین‌آباد', value: 'شین‌آباد' },
    { label: 'صالح‌آباد', value: 'صالح‌آباد' },
    { label: 'صحنه', value: 'صحنه' },
    { label: 'صفی‌آباد', value: 'صفی‌آباد' },
    { label: 'صومعه‌سرا', value: 'صومعه‌سرا' },
    { label: 'طالقان', value: 'طالقان' },
    { label: 'طبس', value: 'طبس' },
    { label: 'طبس مسینا', value: 'طبس مسینا' },
    { label: 'طبس', value: 'طبس' },
    { label: 'طرقبه', value: 'طرقبه' },
    { label: 'طرق رود', value: 'طرق رود' },
    { label: 'طوس', value: 'طوس' },
    { label: 'عجب‌شیر', value: 'عجب‌شیر' },
    { label: 'عسلویه', value: 'عسلویه' },
    { label: 'علی‌آباد', value: 'علی‌آباد' },
    { label: 'عنبرآباد', value: 'عنبرآباد' },
    { label: 'فارسان', value: 'فارسان' },
    { label: 'فراشبند', value: 'فراشبند' },
    { label: 'فردوس', value: 'فردوس' },
    { label: 'فردیس', value: 'فردیس' },
    { label: 'فریدونشهر', value: 'فریدونشهر' },
    { label: 'فریدن', value: 'فریدن' },
    { label: 'فسا', value: 'فسا' },
    { label: 'فیروزآباد', value: 'فیروزآباد' },
    { label: 'فیروزکوه', value: 'فیروزکوه' },
    { label: 'قائم‌شهر', value: 'قائم‌شهر' },
    { label: 'قائن', value: 'قائن' },
    { label: 'قدس', value: 'قدس' },
    { label: 'قزوین', value: 'قزوین' },
    { label: 'قم', value: 'قم' },
    { label: 'قوچان', value: 'قوچان' },
    { label: 'قوشچی', value: 'قوشچی' },
    { label: 'قیدار', value: 'قیدار' },
    { label: 'قیر', value: 'قیر' },
    { label: 'کازرون', value: 'کازرون' },
    { label: 'کاشان', value: 'کاشان' },
    { label: 'کاشمر', value: 'کاشمر' },
    { label: 'کامیاران', value: 'کامیاران' },
    { label: 'کبودر آهنگ', value: 'کبودر آهنگ' },
    { label: 'کرج', value: 'کرج' },
    { label: 'کرمان', value: 'کرمان' },
    { label: 'کرمانشاه', value: 'کرمانشاه' },
    { label: 'کرند', value: 'کرند' },
    { label: 'کلاله', value: 'کلاله' },
    { label: 'کلارآباد', value: 'کلارآباد' },
  ];
  constructor(
    public authVM: AuthVMService,
    public authSvc: UserAuthService,
    private toastService: ToastService,
    private _companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.cityOptions = this.city.map((item) => ({
      label: item.label,
      value: item.value,
    }));
  }

  signup() {
    if (this.signupLoading) {
      return;
    }
    this.authVM.clearError();
    this.signupLoading = true;
    let m = this.authVM.signupForm.getRawValue();
    let model: companyInterFace = {
      companyMobile: m.companyMobile,
      CompanyName: m.companyName,
      companyPassword: m.companyPassword,
      email: m.email,
      companyAddress: '',
      companyTel: '4444',
      companyUniqCode: 'ddddddddddd',
      cityId: '1',
      companyType: '1',
    };
    this._companyService.createCompany(model).subscribe({
      next: (res) => {
        this.signupLoading = false;
        if (res.isOk) {
          if (this.authSvc.prepareSigning(res.data.refreshToken)) {
            return;
          }
        }

        this.authVM.showErrorMessage('');
      },
      error: (err) => {
        let msg = '';
        if (err.error.messages) {
          this.toastService.error(err.error.messages);
          msg = err.error.messages.join(' ');
        } else if (err.error.message) {
          this.toastService.error(err.error.message);
          msg = err.error.message.join(' ');
        }
        this.signupLoading = false;
        this.authVM.showErrorMessage(
          'ثبت اطلاعات با خطا مواجه شده است. لطفا مجدد سعی نمایید.' + msg
        );
      },
    });
  }
}
