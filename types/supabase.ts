export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appConfig: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
        }
        Relationships: []
      }
      baseTemplates: {
        Row: {
          createdAt: string | null
          description: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["template_names"]
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string | null
          description?: string | null
          id?: string
          name: string
          type: Database["public"]["Enums"]["template_names"]
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string | null
          description?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["template_names"]
          updatedAt?: string | null
        }
        Relationships: []
      }
      basics: {
        Row: {
          avatar: string | null
          avatarUpdatedAt: string | null
          createdAt: string
          email: string | null
          fullname: string | null
          id: string
          location: string | null
          mainRole: string | null
          phone: string | null
          resumeId: string | null
          summary: string | null
        }
        Insert: {
          avatar?: string | null
          avatarUpdatedAt?: string | null
          createdAt?: string
          email?: string | null
          fullname?: string | null
          id?: string
          location?: string | null
          mainRole?: string | null
          phone?: string | null
          resumeId?: string | null
          summary?: string | null
        }
        Update: {
          avatar?: string | null
          avatarUpdatedAt?: string | null
          createdAt?: string
          email?: string | null
          fullname?: string | null
          id?: string
          location?: string | null
          mainRole?: string | null
          phone?: string | null
          resumeId?: string | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "basics_resumeId_fkey"
            columns: ["resumeId"]
            isOneToOne: true
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      candidateAttachments: {
        Row: {
          candidateId: string | null
          createdAt: string
          filePath: string | null
          id: string
          name: string | null
          size: number | null
          type: string | null
          url: string | null
        }
        Insert: {
          candidateId?: string | null
          createdAt?: string
          filePath?: string | null
          id?: string
          name?: string | null
          size?: number | null
          type?: string | null
          url?: string | null
        }
        Update: {
          candidateId?: string | null
          createdAt?: string
          filePath?: string | null
          id?: string
          name?: string | null
          size?: number | null
          type?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidateAttachments_candidateId_fkey"
            columns: ["candidateId"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          briefIntro: string | null
          createdAt: string
          groupId: string | null
          id: string
          idempotencyKey: string | null
          name: string | null
          notes: string | null
          rawText: string | null
          resumeUrl: string | null
          status: string | null
          summary: string | null
        }
        Insert: {
          briefIntro?: string | null
          createdAt?: string
          groupId?: string | null
          id?: string
          idempotencyKey?: string | null
          name?: string | null
          notes?: string | null
          rawText?: string | null
          resumeUrl?: string | null
          status?: string | null
          summary?: string | null
        }
        Update: {
          briefIntro?: string | null
          createdAt?: string
          groupId?: string | null
          id?: string
          idempotencyKey?: string | null
          name?: string | null
          notes?: string | null
          rawText?: string | null
          resumeUrl?: string | null
          status?: string | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_groupId_fkey"
            columns: ["groupId"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          backgroundColor: string | null
          createdAt: string
          headerEnabled: boolean
          headerStyles: Json | null
          id: string
          logo: string | null
          name: string | null
          updatedAt: string | null
        }
        Insert: {
          backgroundColor?: string | null
          createdAt?: string
          headerEnabled?: boolean
          headerStyles?: Json | null
          id?: string
          logo?: string | null
          name?: string | null
          updatedAt?: string | null
        }
        Update: {
          backgroundColor?: string | null
          createdAt?: string
          headerEnabled?: boolean
          headerStyles?: Json | null
          id?: string
          logo?: string | null
          name?: string | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      customItems: {
        Row: {
          createdAt: string | null
          customSectionId: string | null
          description: string | null
          endDate: string | null
          id: string
          level: number | null
          location: string | null
          name: string | null
          order: number
          position: string | null
          resumeId: string | null
          skills: string[] | null
          startDate: string | null
          summary: string | null
          url: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string | null
          customSectionId?: string | null
          description?: string | null
          endDate?: string | null
          id?: string
          level?: number | null
          location?: string | null
          name?: string | null
          order: number
          position?: string | null
          resumeId?: string | null
          skills?: string[] | null
          startDate?: string | null
          summary?: string | null
          url?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string | null
          customSectionId?: string | null
          description?: string | null
          endDate?: string | null
          id?: string
          level?: number | null
          location?: string | null
          name?: string | null
          order?: number
          position?: string | null
          resumeId?: string | null
          skills?: string[] | null
          startDate?: string | null
          summary?: string | null
          url?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "customItems_customSectionId_fkey"
            columns: ["customSectionId"]
            isOneToOne: false
            referencedRelation: "customSections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customItems_resumeId_fkey"
            columns: ["resumeId"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      customSections: {
        Row: {
          createdAt: string | null
          id: string
          name: string
          resumeId: string | null
          tempId: string | null
          templateId: string | null
          type: Database["public"]["Enums"]["custom_section_types"]
          visible: boolean | null
        }
        Insert: {
          createdAt?: string | null
          id?: string
          name: string
          resumeId?: string | null
          tempId?: string | null
          templateId?: string | null
          type?: Database["public"]["Enums"]["custom_section_types"]
          visible?: boolean | null
        }
        Update: {
          createdAt?: string | null
          id?: string
          name?: string
          resumeId?: string | null
          tempId?: string | null
          templateId?: string | null
          type?: Database["public"]["Enums"]["custom_section_types"]
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "customSections_resumeId_fkey"
            columns: ["resumeId"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customSections_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      educationItems: {
        Row: {
          createdAt: string
          educationSectionId: string | null
          endDate: string | null
          field: string | null
          id: string
          institution: string | null
          order: number
          startDate: string | null
          summary: string | null
          url: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string
          educationSectionId?: string | null
          endDate?: string | null
          field?: string | null
          id?: string
          institution?: string | null
          order: number
          startDate?: string | null
          summary?: string | null
          url?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string
          educationSectionId?: string | null
          endDate?: string | null
          field?: string | null
          id?: string
          institution?: string | null
          order?: number
          startDate?: string | null
          summary?: string | null
          url?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "educationItems_educationSectionId_fkey"
            columns: ["educationSectionId"]
            isOneToOne: false
            referencedRelation: "educationSections"
            referencedColumns: ["id"]
          },
        ]
      }
      educationSections: {
        Row: {
          createdAt: string
          id: string
          name: string | null
          resumeId: string | null
          templateId: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string
          id?: string
          name?: string | null
          resumeId?: string | null
          templateId?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string | null
          resumeId?: string | null
          templateId?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "educationSections_resumeId_fkey"
            columns: ["resumeId"]
            isOneToOne: true
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educationSections_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      experienceItems: {
        Row: {
          company: string | null
          createdAt: string
          endDate: string | null
          experienceSectionId: string | null
          id: string
          location: string | null
          order: number
          position: string | null
          skills: string[] | null
          startDate: string | null
          summary: string | null
          url: string | null
          visible: boolean | null
        }
        Insert: {
          company?: string | null
          createdAt?: string
          endDate?: string | null
          experienceSectionId?: string | null
          id?: string
          location?: string | null
          order: number
          position?: string | null
          skills?: string[] | null
          startDate?: string | null
          summary?: string | null
          url?: string | null
          visible?: boolean | null
        }
        Update: {
          company?: string | null
          createdAt?: string
          endDate?: string | null
          experienceSectionId?: string | null
          id?: string
          location?: string | null
          order?: number
          position?: string | null
          skills?: string[] | null
          startDate?: string | null
          summary?: string | null
          url?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "experienceItems_experienceSectionId_fkey"
            columns: ["experienceSectionId"]
            isOneToOne: false
            referencedRelation: "experienceSections"
            referencedColumns: ["id"]
          },
        ]
      }
      experienceSections: {
        Row: {
          createdAt: string
          id: string
          name: string | null
          resumeId: string | null
          templateId: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string
          id?: string
          name?: string | null
          resumeId?: string | null
          templateId?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string | null
          resumeId?: string | null
          templateId?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "experienceSections_resumeId_fkey"
            columns: ["resumeId"]
            isOneToOne: true
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experienceSections_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          company: string | null
          companyId: string | null
          createdAt: string
          createdBy: string | null
          description: string | null
          id: string
          isPublic: boolean
          language: string | null
          name: string | null
          requirements: string | null
          sharePresentations: boolean
          shareResumes: boolean
          status: Database["public"]["Enums"]["group_statuses"] | null
          templateId: string | null
        }
        Insert: {
          company?: string | null
          companyId?: string | null
          createdAt?: string
          createdBy?: string | null
          description?: string | null
          id?: string
          isPublic?: boolean
          language?: string | null
          name?: string | null
          requirements?: string | null
          sharePresentations?: boolean
          shareResumes?: boolean
          status?: Database["public"]["Enums"]["group_statuses"] | null
          templateId?: string | null
        }
        Update: {
          company?: string | null
          companyId?: string | null
          createdAt?: string
          createdBy?: string | null
          description?: string | null
          id?: string
          isPublic?: boolean
          language?: string | null
          name?: string | null
          requirements?: string | null
          sharePresentations?: boolean
          shareResumes?: boolean
          status?: Database["public"]["Enums"]["group_statuses"] | null
          templateId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      groupShares: {
        Row: {
          candidateId: string | null
          createdAt: string
          groupId: string
          id: string
        }
        Insert: {
          candidateId?: string | null
          createdAt?: string
          groupId: string
          id?: string
        }
        Update: {
          candidateId?: string | null
          createdAt?: string
          groupId?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "groupShares_candidateId_fkey"
            columns: ["candidateId"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groupShares_groupId_fkey"
            columns: ["groupId"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          acceptedAt: string | null
          companyId: string | null
          createdAt: string
          email: string
          id: string
          invitedBy: string | null
          role: string
          userId: string | null
        }
        Insert: {
          acceptedAt?: string | null
          companyId?: string | null
          createdAt?: string
          email: string
          id?: string
          invitedBy?: string | null
          role: string
          userId?: string | null
        }
        Update: {
          acceptedAt?: string | null
          companyId?: string | null
          createdAt?: string
          email?: string
          id?: string
          invitedBy?: string | null
          role?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invitations_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitations_invitedBy_fkey"
            columns: ["invitedBy"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      languageItems: {
        Row: {
          createdAt: string
          id: string
          languageSectionId: string | null
          level: number | null
          name: string | null
          order: number
          visible: boolean | null
        }
        Insert: {
          createdAt?: string
          id?: string
          languageSectionId?: string | null
          level?: number | null
          name?: string | null
          order: number
          visible?: boolean | null
        }
        Update: {
          createdAt?: string
          id?: string
          languageSectionId?: string | null
          level?: number | null
          name?: string | null
          order?: number
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "languageItems_languageSectionId_fkey"
            columns: ["languageSectionId"]
            isOneToOne: false
            referencedRelation: "languageSections"
            referencedColumns: ["id"]
          },
        ]
      }
      languageSections: {
        Row: {
          createdAt: string
          id: string
          name: string | null
          resumeId: string | null
          templateId: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string
          id?: string
          name?: string | null
          resumeId?: string | null
          templateId?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string | null
          resumeId?: string | null
          templateId?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "languageSections_resumeId_fkey"
            columns: ["resumeId"]
            isOneToOne: true
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "languageSections_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      metadata: {
        Row: {
          createdAt: string | null
          header: Json
          id: string
          layout: Json
          resumeId: string | null
          styles: Json
          templateId: string | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string | null
          header: Json
          id?: string
          layout: Json
          resumeId?: string | null
          styles: Json
          templateId?: string | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string | null
          header?: Json
          id?: string
          layout?: Json
          resumeId?: string | null
          styles?: Json
          templateId?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "metadata_resumeId_fkey"
            columns: ["resumeId"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "metadata_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: true
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      presentationBasicItems: {
        Row: {
          createdAt: string
          fullname: string | null
          id: string
          presentationId: string | null
          summary: string | null
        }
        Insert: {
          createdAt?: string
          fullname?: string | null
          id?: string
          presentationId?: string | null
          summary?: string | null
        }
        Update: {
          createdAt?: string
          fullname?: string | null
          id?: string
          presentationId?: string | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "presentationBasics_presentationId_fkey"
            columns: ["presentationId"]
            isOneToOne: false
            referencedRelation: "presentations"
            referencedColumns: ["id"]
          },
        ]
      }
      presentationLayouts: {
        Row: {
          createdAt: string
          id: string
          instructions: string | null
          order: number | null
          templateId: string | null
          title: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string
          id?: string
          instructions?: string | null
          order?: number | null
          templateId?: string | null
          title?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string
          id?: string
          instructions?: string | null
          order?: number | null
          templateId?: string | null
          title?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "presentationLayouts_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      presentationLayoutSubitems: {
        Row: {
          createdAt: string
          id: string
          instructions: string | null
          presentationLayoutId: string | null
          title: string | null
        }
        Insert: {
          createdAt?: string
          id?: string
          instructions?: string | null
          presentationLayoutId?: string | null
          title?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          instructions?: string | null
          presentationLayoutId?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "presentationLayoutSubitems_presentationLayoutId_fkey"
            columns: ["presentationLayoutId"]
            isOneToOne: false
            referencedRelation: "presentationLayouts"
            referencedColumns: ["id"]
          },
        ]
      }
      presentations: {
        Row: {
          candidateId: string | null
          createdAt: string
          groupId: string | null
          id: string
          idempotencyKey: string | null
          status: string | null
          updatedAt: string | null
        }
        Insert: {
          candidateId?: string | null
          createdAt?: string
          groupId?: string | null
          id?: string
          idempotencyKey?: string | null
          status?: string | null
          updatedAt?: string | null
        }
        Update: {
          candidateId?: string | null
          createdAt?: string
          groupId?: string | null
          id?: string
          idempotencyKey?: string | null
          status?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "presentations_candidateId_fkey"
            columns: ["candidateId"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "presentations_groupId_fkey"
            columns: ["groupId"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      presentationSectionItems: {
        Row: {
          createdAt: string
          id: string
          order: number | null
          presentationId: string | null
          text: string | null
          title: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string
          id?: string
          order?: number | null
          presentationId?: string | null
          text?: string | null
          title?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string
          id?: string
          order?: number | null
          presentationId?: string | null
          text?: string | null
          title?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "presentationSectionItems_presentationId_fkey"
            columns: ["presentationId"]
            isOneToOne: false
            referencedRelation: "presentations"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          candidateId: string | null
          createdAt: string
          id: string
          idempotencyKey: string | null
          name: string
          status: string | null
          templateId: string
          updatedAt: string | null
          userId: string | null
        }
        Insert: {
          candidateId?: string | null
          createdAt?: string
          id?: string
          idempotencyKey?: string | null
          name: string
          status?: string | null
          templateId: string
          updatedAt?: string | null
          userId?: string | null
        }
        Update: {
          candidateId?: string | null
          createdAt?: string
          id?: string
          idempotencyKey?: string | null
          name?: string
          status?: string | null
          templateId?: string
          updatedAt?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resumes_candidateId_fkey"
            columns: ["candidateId"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resumes_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resumes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      skillItems: {
        Row: {
          createdAt: string | null
          id: string
          level: number | null
          name: string | null
          order: number
          skillSectionId: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string | null
          id?: string
          level?: number | null
          name?: string | null
          order: number
          skillSectionId?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string | null
          id?: string
          level?: number | null
          name?: string | null
          order?: number
          skillSectionId?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "skillSectionItems_skillSectionId_fkey"
            columns: ["skillSectionId"]
            isOneToOne: false
            referencedRelation: "skillSections"
            referencedColumns: ["id"]
          },
        ]
      }
      skillSections: {
        Row: {
          createdAt: string
          id: string
          name: string | null
          resumeId: string | null
          templateId: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string
          id?: string
          name?: string | null
          resumeId?: string | null
          templateId?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string | null
          resumeId?: string | null
          templateId?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "skillSections_resumeId_fkey"
            columns: ["resumeId"]
            isOneToOne: true
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skillSections_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      socialItems: {
        Row: {
          createdAt: string
          id: string
          network: string | null
          order: number
          socialSectionId: string | null
          url: string | null
          username: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string
          id?: string
          network?: string | null
          order: number
          socialSectionId?: string | null
          url?: string | null
          username?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string
          id?: string
          network?: string | null
          order?: number
          socialSectionId?: string | null
          url?: string | null
          username?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "socialItems_socialSectionId_fkey"
            columns: ["socialSectionId"]
            isOneToOne: false
            referencedRelation: "socialSections"
            referencedColumns: ["id"]
          },
        ]
      }
      socialSections: {
        Row: {
          createdAt: string
          id: string
          name: string | null
          resumeId: string | null
          templateId: string | null
          visible: boolean | null
        }
        Insert: {
          createdAt?: string
          id?: string
          name?: string | null
          resumeId?: string | null
          templateId?: string | null
          visible?: boolean | null
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string | null
          resumeId?: string | null
          templateId?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "socialSections_resumeId_fkey"
            columns: ["resumeId"]
            isOneToOne: true
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "socialSections_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          allowUserToEdit: boolean
          baseTemplateId: string | null
          companyId: string | null
          createdAt: string
          description: string | null
          id: string
          name: string
          updatedAt: string
        }
        Insert: {
          allowUserToEdit?: boolean
          baseTemplateId?: string | null
          companyId?: string | null
          createdAt?: string
          description?: string | null
          id?: string
          name: string
          updatedAt?: string
        }
        Update: {
          allowUserToEdit?: boolean
          baseTemplateId?: string | null
          companyId?: string | null
          createdAt?: string
          description?: string | null
          id?: string
          name?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_baseTemplateId_fkey"
            columns: ["baseTemplateId"]
            isOneToOne: false
            referencedRelation: "baseTemplates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "templates_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      userLayouts: {
        Row: {
          createdAt: string
          id: string
          layout: Json
          resumeId: string | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          id?: string
          layout: Json
          resumeId?: string | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          layout?: Json
          resumeId?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userLayouts_resumeId_fkey"
            columns: ["resumeId"]
            isOneToOne: true
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          companyId: string | null
          createdAt: string
          email: string
          firstName: string | null
          id: string
          lastName: string | null
          location: string | null
          mainRole: string | null
          phone: string | null
          summary: string | null
          updatedAt: string
        }
        Insert: {
          avatar?: string | null
          companyId?: string | null
          createdAt?: string
          email: string
          firstName?: string | null
          id: string
          lastName?: string | null
          location?: string | null
          mainRole?: string | null
          phone?: string | null
          summary?: string | null
          updatedAt?: string
        }
        Update: {
          avatar?: string | null
          companyId?: string | null
          createdAt?: string
          email?: string
          firstName?: string | null
          id?: string
          lastName?: string | null
          location?: string | null
          mainRole?: string | null
          phone?: string | null
          summary?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      users_companies: {
        Row: {
          companyId: string
          createdAt: string
          userId: string
        }
        Insert: {
          companyId: string
          createdAt?: string
          userId: string
        }
        Update: {
          companyId?: string
          createdAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_companies_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_companies_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          createdAt: string
          email: string
          id: string
          rateLimitKey: string | null
        }
        Insert: {
          createdAt?: string
          email: string
          id?: string
          rateLimitKey?: string | null
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          rateLimitKey?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      confirm_current_user_password: {
        Args: {
          current_plain_password: string
        }
        Returns: Json
      }
      create_user: {
        Args: {
          email: string
          password: string
        }
        Returns: string
      }
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_company_users_with_roles: {
        Args: {
          company_id: string
        }
        Returns: {
          id: string
          email: string
          firstname: string
          lastname: string
          role: string
        }[]
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      has_custom_section_access: {
        Args: {
          section_id: string
        }
        Returns: boolean
      }
      has_resume_access: {
        Args: {
          resume_id: string
        }
        Returns: boolean
      }
      has_section_access: {
        Args: {
          section_id: string
          section_type: string
        }
        Returns: boolean
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
    }
    Enums: {
      custom_section_types: "default" | "skill"
      group_statuses: "pending" | "active" | "finished"
      template_names: "default" | "minimal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
