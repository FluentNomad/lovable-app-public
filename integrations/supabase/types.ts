export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      booking_links: {
        Row: {
          bookings_count: number | null
          business_partner_id: string
          clicks_count: number | null
          commission_rate: number | null
          created_at: string | null
          id: string
          location_id: string
          tour_name: string
          tour_url: string
          updated_at: string | null
        }
        Insert: {
          bookings_count?: number | null
          business_partner_id: string
          clicks_count?: number | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          location_id: string
          tour_name: string
          tour_url: string
          updated_at?: string | null
        }
        Update: {
          bookings_count?: number | null
          business_partner_id?: string
          clicks_count?: number | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          location_id?: string
          tour_name?: string
          tour_url?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_links_business_partner_id_fkey"
            columns: ["business_partner_id"]
            isOneToOne: false
            referencedRelation: "business_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_links_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      business_partners: {
        Row: {
          business_name: string
          commission_rate: number | null
          contact_email: string
          contact_phone: string | null
          created_at: string | null
          id: string
          status: Database["public"]["Enums"]["partner_status"] | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          business_name: string
          commission_rate?: number | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["partner_status"] | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          business_name?: string
          commission_rate?: number | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["partner_status"] | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          iso_code: string
          latitude: number
          longitude: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          iso_code: string
          latitude: number
          longitude: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          iso_code?: string
          latitude?: number
          longitude?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          country: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          lessons_count: number
          level: string
          title: string
          updated_at: string
        }
        Insert: {
          country: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          lessons_count?: number
          level: string
          title: string
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          lessons_count?: number
          level?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lesson_sections: {
        Row: {
          audio_url: string | null
          content: string
          created_at: string | null
          id: string
          lesson_id: string
          order_index: number
          section_type: Database["public"]["Enums"]["lesson_section_type"]
          title: string
          updated_at: string | null
        }
        Insert: {
          audio_url?: string | null
          content: string
          created_at?: string | null
          id?: string
          lesson_id: string
          order_index?: number
          section_type: Database["public"]["Enums"]["lesson_section_type"]
          title: string
          updated_at?: string | null
        }
        Update: {
          audio_url?: string | null
          content?: string
          created_at?: string | null
          id?: string
          lesson_id?: string
          order_index?: number
          section_type?: Database["public"]["Enums"]["lesson_section_type"]
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_sections_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "location_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          audio_url: string | null
          content: string
          course_id: string
          created_at: string
          duration_minutes: number | null
          id: string
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          audio_url?: string | null
          content: string
          course_id: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          order_index: number
          title: string
          updated_at?: string
        }
        Update: {
          audio_url?: string | null
          content?: string
          course_id?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      location_lessons: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          location_id: string
          order_index: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location_id: string
          order_index?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location_id?: string
          order_index?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "location_lessons_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          country_id: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          latitude: number
          longitude: number
          name: string
          order_index: number
          updated_at: string | null
        }
        Insert: {
          country_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          latitude: number
          longitude: number
          name: string
          order_index?: number
          updated_at?: string | null
        }
        Update: {
          country_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number
          longitude?: number
          name?: string
          order_index?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          learning_language: Database["public"]["Enums"]["language_code"]
          native_language: Database["public"]["Enums"]["language_code"]
          target_country: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          learning_language?: Database["public"]["Enums"]["language_code"]
          native_language?: Database["public"]["Enums"]["language_code"]
          target_country?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          learning_language?: Database["public"]["Enums"]["language_code"]
          native_language?: Database["public"]["Enums"]["language_code"]
          target_country?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sub_lessons: {
        Row: {
          audio_url: string | null
          content: string
          created_at: string | null
          description: string | null
          id: string
          location_id: string
          order_index: number
          parent_lesson_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          audio_url?: string | null
          content: string
          created_at?: string | null
          description?: string | null
          id?: string
          location_id: string
          order_index?: number
          parent_lesson_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          audio_url?: string | null
          content?: string
          created_at?: string | null
          description?: string | null
          id?: string
          location_id?: string
          order_index?: number
          parent_lesson_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_lessons_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sub_lessons_parent_lesson_id_fkey"
            columns: ["parent_lesson_id"]
            isOneToOne: false
            referencedRelation: "location_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_location_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          location_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          location_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          location_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_location_progress_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string
          score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student" | "teacher"
      language_code: "en" | "es"
      lesson_section_type:
        | "grammar"
        | "conversation"
        | "exercises"
        | "vocabulary"
        | "safety"
      partner_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student", "teacher"],
      language_code: ["en", "es"],
      lesson_section_type: [
        "grammar",
        "conversation",
        "exercises",
        "vocabulary",
        "safety",
      ],
      partner_status: ["pending", "approved", "rejected"],
    },
  },
} as const
