import mongoose, { Schema, Model } from 'mongoose';

export interface ISubmission {
  name: string;
  email: string;
  phone: string;
  country: string;
  projectType: string;
  plotArea: number;
  budget: string;
  description: string;
  timeline: string;
  referenceImages?: string[];
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'rejected';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    projectType: { 
      type: String, 
      required: true,
      enum: ['residential', 'commercial', 'interior', 'landscape', 'renovation']
    },
    plotArea: { type: Number, required: true },
    budget: { 
      type: String, 
      required: true,
      enum: ['under-50k', '50k-100k', '100k-250k', '250k-500k', 'above-500k']
    },
    description: { type: String, required: true },
    timeline: { 
      type: String, 
      required: true,
      enum: ['urgent', '1-3-months', '3-6-months', 'flexible']
    },
    referenceImages: [{ type: String }],
    status: { 
      type: String, 
      enum: ['new', 'contacted', 'in-progress', 'completed', 'rejected'],
      default: 'new'
    },
    notes: { type: String },
  },
  { timestamps: true }
);

const Submission: Model<ISubmission> = mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);

export default Submission;
