import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { environment } from '@core-modules/core';
import { BasePageComponent } from '@core-modules/main-layout';
import { FormsService } from '@core-modules/catalog/modules/forms';

import { BusinessesService } from '@businesses-feature-module/services/businesses.service';

@Component({
  selector: 'app-businesses-locations-insert',
  templateUrl: './locations-insert.component.html',
  styleUrls: ['./locations-insert.component.scss']
})
export class LocationsInsertComponent extends BasePageComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup;
  get f() { return this.form.controls; }

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
            <div class="result-success actions h-100"><a href="javascript:;" title="Remover" data-dz-remove><i class="fa fa-trash"></i></a></div>
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
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      url: `${environment.apiUrl}/businesses/v1/file`,
      acceptedFiles: '.csv',
      previewsContainer: '#dataUploadPreview'
    }
  };

  public qickGuideLink = "";

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly businessesService: BusinessesService,
    private readonly formsService: FormsService) {
    super();
  }


  ngOnInit() {

    this.loader.show('pageLoader');

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      dataFile: [null, Validators.required]
    });

    this.qickGuideLink = `${environment.apiUrl}/insights/v1/guide`;
  }

  ngAfterViewInit() {
    this.loader.hide('pageLoader');
  }


  onFormSubmit() {
    this.logger.info('form', this.form.value);

    if (this.form.valid) {
      this.loader.show('pageLoader');

      const bodyPayload = this.form.value;
      this.subscriptions.push(
        this.businessesService.sendNewLocationsFile(bodyPayload)
          .subscribe(
            (response) => {
              this.loader.hide('pageLoader');
              this.notification.success('A informação foi enviada com sucesso');
              localStorage.setItem('lastImportStatus', JSON.stringify(response['data']));
              this.router.navigateByUrl('businesses/locations/success');
            },
            error => {
              this.loader.hide('pageLoader');
              this.notification.error('Ocorreu um erro ao registar. Tente mais tarde ou contacte os nossos serviços de apoio.');
              this.logger.error('Locations insertion unsuccessful', error);
            }));
    }
    else {
      this.loader.hide('pageLoader');
      this.formsService.showErrors(this.form);
    }
  }

  onFileAdded(event) { }

  onFileRemoved(event) { }

  onUploadSuccess(formField, event) {

    const file = event[0];
    const response = event[1];
    file.previewElement.querySelectorAll('.result-success').forEach(el => {
      el.classList.remove('d-none');
    });

    file.previewElement.querySelectorAll('.result-error').forEach(el => {
      el.classList.add('d-none');
    });

    this.form.get(formField).setValue(response.data?.id);
  }

  onUploadError(event) {

    const file = event[0];
    const response = event[1];

    file.previewElement.querySelectorAll('.result-success').forEach(el => {
      el.classList.add('d-none');
    });
    file.previewElement.querySelectorAll('.result-error').forEach(el => {
      el.classList.remove('d-none');
    });
  }

  downloadTemplate() {
    window.open('/assets/templates/O4B_Template.csv');
  }
}
