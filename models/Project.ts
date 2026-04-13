import mongoose, { Schema, Model } from 'mongoose';

export interface IProject {
  title: string;
  description: string;
  category: string;
  location: string;
  area: number;
  images: string[];
  coverImage: string;
  clientName?: string;
  completionDate?: Date;
  featured: boolean;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['residential', 'commercial', 'interior', 'landscape', 'renovation']
    },
    location: { type: String, required: true },
    area: { type: Number, required: true },
    images: [{ type: String }],
    coverImage: { type: String, required: true },
    clientName: { type: String },
    completionDate: { type: Date },
    featured: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ['draft', 'published'],
      default: 'draft'
    },
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
