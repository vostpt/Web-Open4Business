import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '@core-modules/catalog/modules/forms';
import { environment } from '@core-modules/core';
import { BasePageComponent } from '@core-modules/main-layout';
import { HomeService } from '@home-feature-module/services/home.service';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';


@Component({
  selector: 'app-home-large-companies',
  templateUrl: './large-companies.component.html',
  styleUrls: ['./large-companies.component.scss']
})
export class LargeCompaniesComponent extends BasePageComponent implements
    OnInit, AfterViewInit, OnDestroy {
  form: FormGroup;

  defaultUploadConfiguration: DropzoneConfigInterface = {
    dictRemoveFileConfirmation: 'Tem a certeza que deseja remover o ficheiro?',
    maxFilesize: 1,
    maxFiles: 1,
    previewTemplate: `
    <div id="preview-template" class="dz-preview">
      <div class="dropzone-info">
        <div class="details h-100">
          <div class="d-flex">
            <div class="result-success dz-success-mark"><i class="fa fa-check text-success"></i></div>
            <div class="result-error dz-error-mark pl-2"> <i class="fa fa-times text-danger"></i> </div> &nbsp; 
            <span data-dz-name class="result-success pl-2"></span><span class="result-success pl-2" data-dz-size></span>
            <div class="result-success actions h-100"><a href="javascript:;" title="Remover" data-dz-remove><i class="fa fa-trash"></i></a></div
            <div class="result-error dz-error-message">Ocorreu um erro. Tente novamente ou contacte-nos para apoio.</div>
          </div>
        </div>
      </div>
    </div>`
  };

  dataUploadConfiguration = {
    ...this.defaultUploadConfiguration,
    ...{
      dictDefaultMessage: 'Pressione ou arraste um ficheiro .csv',
          url: `${environment.apiUrl}/insights/v1/file`, acceptedFiles: '.csv',
          previewsContainer: '#dataUploadPreview'
    }
  };

  logoUploadConfiguration = {
    ...this.defaultUploadConfiguration,
    ...{
      dictDefaultMessage: 'Pressione ou arraste uma imagem .jpg ou .png',
          url: `${environment.apiUrl}/insights/v1/file`,
          acceptedFiles: ['.png', '.jpg', '.jepg'],
          previewsContainer: '#logoUploadPreview'
    }
  };


  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly homeService: HomeService,
      private readonly formsService: FormsService) {
    super();
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.loader.show('pageLoader');

    this.form = this.formBuilder.group({
      company: [null, Validators.required],
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      dataFile: [null, Validators.required],
      logo: [null]
    });

    this.loader.hide('pageLoader');

    document.getElementById('kt_quick_panel_close_btn').click();
  }


  onFormSubmit() {
    this.logger.info('form', this.form.value)


    if (this.form.valid) {
      this.loader.show('pageLoader');

      const bodyPayload = this.form.value;
      this.subscriptions.push(
          this.homeService.sendLargeCompaniesForm(bodyPayload)
              .subscribe(
                  () => {
                    this.notification.success(
                        'A informação foi enviada com sucesso');
                  },
                  err => {
                    // if ((err.error.data || {}).errors) {
                    //   this.formGeneralErrors.messages =
                    //   err.error.data.errors;
                    // } else {
                    //   this.formGeneralErrors.messages.push(err.error.resultMessage);
                    // }
                    // this.formGeneralErrors.visible = true;

                    this.loader.hide('pageLoader');
                  }));
    }
    else {
      // TODO: verificar estes erros!
      this.formsService.showErrors(this.form);
    }
  }

  onFileAdded(event) {}

  onFileRemoved(event) {}

  onUploadSuccess(formField, event) {
    console.log('onUploadSuccess', event);

    const file = event[0];
    const response = event[1];
    file.previewElement.querySelectorAll('.result-success').forEach(el => {
      el.classList.remove('d-none');
    });

    file.previewElement.querySelectorAll('.result-error').forEach(el => {
      el.classList.add('d-none'); 
    })

    this.form.get(formField).setValue(response.data?.id);
  }

  onUploadError(event) {
    console.log('onUploadError', event, event[0].previewElement);

    const file = event[0];
    const response = event[1];

    file.previewElement.querySelectorAll('.result-success').forEach(el => {
      el.classList.add('d-none');
    })
    file.previewElement.querySelectorAll('.result-error').forEach(el => {
      el.classList.remove('d-none');
    })
  }
}
