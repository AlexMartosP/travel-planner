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
      Activites: {
        Row: {
          address: string | null
          created_at: string
          description: string
          do_date: string | null
          done: boolean
          id: string
          image_path: string | null
          title: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          description: string
          do_date?: string | null
          done?: boolean
          id?: string
          image_path?: string | null
          title: string
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string
          do_date?: string | null
          done?: boolean
          id?: string
          image_path?: string | null
          title?: string
        }
        Relationships: []
      }
      Profiles: {
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
            foreignKeyName: "Profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Trips: {
        Row: {
          created_at: string
          description: string | null
          destination_name: string
          end_date: string | null
          id: number
          start_date: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          destination_name: string
          end_date?: string | null
          id?: number
          start_date: string
        }
        Update: {
          created_at?: string
          description?: string | null
          destination_name?: string
          end_date?: string | null
          id?: number
          start_date?: string
        }
        Relationships: []
      }
      trips_activites: {
        Row: {
          activity: string
          trip: number
        }
        Insert: {
          activity: string
          trip: number
        }
        Update: {
          activity?: string
          trip?: number
        }
        Relationships: [
          {
            foreignKeyName: "trips_activites_activity_fkey"
            columns: ["activity"]
            isOneToOne: false
            referencedRelation: "Activites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_activites_trip_fkey"
            columns: ["trip"]
            isOneToOne: false
            referencedRelation: "Trips"
            referencedColumns: ["id"]
          }
        ]
      }
      trips_profiles: {
        Row: {
          profile_id: string
          trip_id: number
        }
        Insert: {
          profile_id: string
          trip_id: number
        }
        Update: {
          profile_id?: string
          trip_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "trips_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_profiles_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "Trips"
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

