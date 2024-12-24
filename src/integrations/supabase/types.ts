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
      api_logs: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          request_method: string
          request_payload: Json | null
          response_payload: Json | null
          status_code: number
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          request_method: string
          request_payload?: Json | null
          response_payload?: Json | null
          status_code: number
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          request_method?: string
          request_payload?: Json | null
          response_payload?: Json | null
          status_code?: number
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string | null
          feedback_text: string | null
          feedback_type: string | null
          id: string
          order_id: string | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feedback_text?: string | null
          feedback_type?: string | null
          id?: string
          order_id?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feedback_text?: string | null
          feedback_type?: string | null
          id?: string
          order_id?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "parcel_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "driver_analytics"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          id: string
          latitude: number
          longitude: number
          order_id: string
          recorded_at: string | null
        }
        Insert: {
          id?: string
          latitude: number
          longitude: number
          order_id: string
          recorded_at?: string | null
        }
        Update: {
          id?: string
          latitude?: number
          longitude?: number
          order_id?: string
          recorded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "parcel_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      parcel_images: {
        Row: {
          file_url: string
          id: string
          order_id: string
          uploaded_at: string | null
        }
        Insert: {
          file_url: string
          id?: string
          order_id: string
          uploaded_at?: string | null
        }
        Update: {
          file_url?: string
          id?: string
          order_id?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parcel_images_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "parcel_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      parcel_orders: {
        Row: {
          assigned_driver_id: string | null
          created_at: string | null
          customer_id: string
          delivery_address: string
          id: string
          pickup_address: string
          status: string
        }
        Insert: {
          assigned_driver_id?: string | null
          created_at?: string | null
          customer_id: string
          delivery_address: string
          id?: string
          pickup_address: string
          status: string
        }
        Update: {
          assigned_driver_id?: string | null
          created_at?: string | null
          customer_id?: string
          delivery_address?: string
          id?: string
          pickup_address?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "parcel_orders_assigned_driver_id_fkey"
            columns: ["assigned_driver_id"]
            isOneToOne: false
            referencedRelation: "driver_analytics"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "parcel_orders_assigned_driver_id_fkey"
            columns: ["assigned_driver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parcel_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "driver_analytics"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "parcel_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          order_id: string
          payment_method: string
          payment_status: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          order_id: string
          payment_method: string
          payment_status: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          order_id?: string
          payment_method?: string
          payment_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "parcel_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          password_hash: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          password_hash: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password_hash?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      driver_analytics: {
        Row: {
          average_rating: number | null
          completed_deliveries: number | null
          driver_id: string | null
          driver_name: string | null
          total_deliveries: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      handle_payment_success: {
        Args: {
          payment_id: string
        }
        Returns: undefined
      }
      update_parcel_status: {
        Args: {
          parcel_id: string
          new_status: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
