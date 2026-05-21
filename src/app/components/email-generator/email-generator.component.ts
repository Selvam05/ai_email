import { Component, signal } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import {
  AiService,
  EmailRequest
} from '../../services/ai.service';

@Component({
  selector: 'app-email-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './email-generator.component.html',
  styleUrl: './email-generator.component.css',
})

export class EmailGeneratorComponent {

  form: FormGroup;

  loading = signal(false);

  generatedEmail = signal('');

  error = signal('');

  showModal = signal(false);

  tones = [
    'Professional',
    'Friendly',
    'Formal',
    'Casual',
    'Persuasive'
  ];

  constructor(
    private fb: FormBuilder,
    private aiService: AiService
  ) {

    this.form = this.fb.group({

      recipientName: ['', Validators.required],

      purpose: ['', Validators.required],

      tone: ['Professional', Validators.required],

      notes: ['']

    });

  }

  onSubmit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.generatedEmail.set('');

    this.error.set('');

    this.showModal.set(false);

    const data: EmailRequest = this.form.value;

    this.aiService.generateEmail(data).subscribe({

      next: (res) => {

        this.generatedEmail.set(res.email);

        this.loading.set(false);

      },

      error: (err) => {

        console.error(err);

        this.error.set(
          'Failed to generate email.'
        );

        this.loading.set(false);

      }

    });

  }

  openPopup() {
    this.showModal.set(true);
  }

  closePopup() {
    this.showModal.set(false);
  }

  copyToClipboard() {

    navigator.clipboard.writeText(
      this.generatedEmail()
    );

    alert('Email copied successfully!');

  }

  clearError() {
    this.error.set('');
  }

}