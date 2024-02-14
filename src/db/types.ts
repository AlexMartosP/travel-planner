export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activites: {
        Row: {
          address: string | null
          created_at: string
          description: string | null
          do_date: string | null
          done: boolean
          id: string
          image_path: string | null
          title: string
          trip_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string | null
          do_date?: string | null
          done?: boolean
          id?: string
          image_path?: string | null
          title: string
          trip_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string | null
          do_date?: string | null
          done?: boolean
          id?: string
          image_path?: string | null
          title?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activites_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          }
        ]
      }
      invitations: {
        Row: {
          created_at: string
          has_expired: boolean
          id: string
          invitee_email: string
          trip_id: string
        }
        Insert: {
          created_at?: string
          has_expired?: boolean
          id?: string
          invitee_email: string
          trip_id: string
        }
        Update: {
          created_at?: string
          has_expired?: boolean
          id?: string
          invitee_email?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_invitee_email_fkey"
            columns: ["invitee_email"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "invitations_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          full_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      trips: {
        Row: {
          created_at: string
          description: string | null
          destination_name: string
          end_date: string | null
          id: string
          start_date: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          destination_name: string
          end_date?: string | null
          id?: string
          start_date: string
        }
        Update: {
          created_at?: string
          description?: string | null
          destination_name?: string
          end_date?: string | null
          id?: string
          start_date?: string
        }
        Relationships: []
      }
      trips_profiles: {
        Row: {
          profile_id: string
          trip_id: string
        }
        Insert: {
          profile_id: string
          trip_id: string
        }
        Update: {
          profile_id?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_profiles_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

