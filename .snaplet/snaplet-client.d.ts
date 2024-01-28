type ScalarField = {
  name: string;
  type: string;
};
type ObjectField = ScalarField & {
  relationFromFields: string[];
  relationToFields: string[];
};
type Inflection = {
  modelName?: (name: string) => string;
  scalarField?: (field: ScalarField) => string;
  parentField?: (field: ObjectField, oppositeBaseNameMap: Record<string, string>) => string;
  childField?: (field: ObjectField, oppositeField: ObjectField, oppositeBaseNameMap: Record<string, string>) => string;
  oppositeBaseNameMap?: Record<string, string>;
};
type Override = {
  Activites?: {
    name?: string;
    fields?: {
      id?: string;
      created_at?: string;
      title?: string;
      description?: string;
      do_date?: string;
      done?: string;
      address?: string;
      image_path?: string;
      trips_activites?: string;
    };
  }
  Profiles?: {
    name?: string;
    fields?: {
      id?: string;
      created_at?: string;
      email?: string;
      first_name?: string;
      last_name?: string;
      users?: string;
      trips_profiles?: string;
    };
  }
  Trips?: {
    name?: string;
    fields?: {
      id?: string;
      created_at?: string;
      destination_name?: string;
      start_date?: string;
      end_date?: string;
      description?: string;
      trips_activites?: string;
      trips_profiles?: string;
    };
  }
  _http_response?: {
    name?: string;
    fields?: {
      id?: string;
      status_code?: string;
      content_type?: string;
      headers?: string;
      content?: string;
      timed_out?: string;
      error_msg?: string;
      created?: string;
    };
  }
  audit_log_entries?: {
    name?: string;
    fields?: {
      instance_id?: string;
      id?: string;
      payload?: string;
      created_at?: string;
      ip_address?: string;
    };
  }
  buckets?: {
    name?: string;
    fields?: {
      id?: string;
      name?: string;
      owner?: string;
      created_at?: string;
      updated_at?: string;
      public?: string;
      avif_autodetection?: string;
      file_size_limit?: string;
      allowed_mime_types?: string;
      owner_id?: string;
      objects?: string;
    };
  }
  flow_state?: {
    name?: string;
    fields?: {
      id?: string;
      user_id?: string;
      auth_code?: string;
      code_challenge_method?: string;
      code_challenge?: string;
      provider_type?: string;
      provider_access_token?: string;
      provider_refresh_token?: string;
      created_at?: string;
      updated_at?: string;
      authentication_method?: string;
      saml_relay_states?: string;
    };
  }
  hooks?: {
    name?: string;
    fields?: {
      id?: string;
      hook_table_id?: string;
      hook_name?: string;
      created_at?: string;
      request_id?: string;
    };
  }
  http_request_queue?: {
    name?: string;
    fields?: {
      id?: string;
      method?: string;
      url?: string;
      headers?: string;
      body?: string;
      timeout_milliseconds?: string;
    };
  }
  identities?: {
    name?: string;
    fields?: {
      provider_id?: string;
      user_id?: string;
      identity_data?: string;
      provider?: string;
      last_sign_in_at?: string;
      created_at?: string;
      updated_at?: string;
      email?: string;
      id?: string;
      users?: string;
    };
  }
  instances?: {
    name?: string;
    fields?: {
      id?: string;
      uuid?: string;
      raw_base_config?: string;
      created_at?: string;
      updated_at?: string;
    };
  }
  key?: {
    name?: string;
    fields?: {
      id?: string;
      status?: string;
      created?: string;
      expires?: string;
      key_type?: string;
      key_id?: string;
      key_context?: string;
      name?: string;
      associated_data?: string;
      raw_key?: string;
      raw_key_nonce?: string;
      parent_key?: string;
      comment?: string;
      user_data?: string;
      key?: string;
      key?: string;
      secrets?: string;
    };
  }
  mfa_amr_claims?: {
    name?: string;
    fields?: {
      session_id?: string;
      created_at?: string;
      updated_at?: string;
      authentication_method?: string;
      id?: string;
      sessions?: string;
    };
  }
  mfa_challenges?: {
    name?: string;
    fields?: {
      id?: string;
      factor_id?: string;
      created_at?: string;
      verified_at?: string;
      ip_address?: string;
      mfa_factors?: string;
    };
  }
  mfa_factors?: {
    name?: string;
    fields?: {
      id?: string;
      user_id?: string;
      friendly_name?: string;
      factor_type?: string;
      status?: string;
      created_at?: string;
      updated_at?: string;
      secret?: string;
      users?: string;
      mfa_challenges?: string;
    };
  }
  storage_migrations?: {
    name?: string;
    fields?: {
      id?: string;
      name?: string;
      hash?: string;
      executed_at?: string;
    };
  }
  supabase_functions_migrations?: {
    name?: string;
    fields?: {
      version?: string;
      inserted_at?: string;
    };
  }
  objects?: {
    name?: string;
    fields?: {
      id?: string;
      bucket_id?: string;
      name?: string;
      owner?: string;
      created_at?: string;
      updated_at?: string;
      last_accessed_at?: string;
      metadata?: string;
      path_tokens?: string;
      version?: string;
      owner_id?: string;
      buckets?: string;
    };
  }
  refresh_tokens?: {
    name?: string;
    fields?: {
      instance_id?: string;
      id?: string;
      token?: string;
      user_id?: string;
      revoked?: string;
      created_at?: string;
      updated_at?: string;
      parent?: string;
      session_id?: string;
      sessions?: string;
    };
  }
  saml_providers?: {
    name?: string;
    fields?: {
      id?: string;
      sso_provider_id?: string;
      entity_id?: string;
      metadata_xml?: string;
      metadata_url?: string;
      attribute_mapping?: string;
      created_at?: string;
      updated_at?: string;
      sso_providers?: string;
    };
  }
  saml_relay_states?: {
    name?: string;
    fields?: {
      id?: string;
      sso_provider_id?: string;
      request_id?: string;
      for_email?: string;
      redirect_to?: string;
      from_ip_address?: string;
      created_at?: string;
      updated_at?: string;
      flow_state_id?: string;
      flow_state?: string;
      sso_providers?: string;
    };
  }
  auth_schema_migrations?: {
    name?: string;
    fields?: {
      version?: string;
    };
  }
  supabase_migrations_schema_migrations?: {
    name?: string;
    fields?: {
      version?: string;
      statements?: string;
      name?: string;
    };
  }
  secrets?: {
    name?: string;
    fields?: {
      id?: string;
      name?: string;
      description?: string;
      secret?: string;
      key_id?: string;
      nonce?: string;
      created_at?: string;
      updated_at?: string;
      key?: string;
    };
  }
  sessions?: {
    name?: string;
    fields?: {
      id?: string;
      user_id?: string;
      created_at?: string;
      updated_at?: string;
      factor_id?: string;
      aal?: string;
      not_after?: string;
      refreshed_at?: string;
      user_agent?: string;
      ip?: string;
      tag?: string;
      users?: string;
      mfa_amr_claims?: string;
      refresh_tokens?: string;
    };
  }
  sso_domains?: {
    name?: string;
    fields?: {
      id?: string;
      sso_provider_id?: string;
      domain?: string;
      created_at?: string;
      updated_at?: string;
      sso_providers?: string;
    };
  }
  sso_providers?: {
    name?: string;
    fields?: {
      id?: string;
      resource_id?: string;
      created_at?: string;
      updated_at?: string;
      saml_providers?: string;
      saml_relay_states?: string;
      sso_domains?: string;
    };
  }
  trips_activites?: {
    name?: string;
    fields?: {
      trip?: string;
      activity?: string;
      Activites?: string;
      Trips?: string;
    };
  }
  trips_profiles?: {
    name?: string;
    fields?: {
      trip_id?: string;
      profile_id?: string;
      Profiles?: string;
      Trips?: string;
    };
  }
  users?: {
    name?: string;
    fields?: {
      instance_id?: string;
      id?: string;
      aud?: string;
      role?: string;
      email?: string;
      encrypted_password?: string;
      email_confirmed_at?: string;
      invited_at?: string;
      confirmation_token?: string;
      confirmation_sent_at?: string;
      recovery_token?: string;
      recovery_sent_at?: string;
      email_change_token_new?: string;
      email_change?: string;
      email_change_sent_at?: string;
      last_sign_in_at?: string;
      raw_app_meta_data?: string;
      raw_user_meta_data?: string;
      is_super_admin?: string;
      created_at?: string;
      updated_at?: string;
      phone?: string;
      phone_confirmed_at?: string;
      phone_change?: string;
      phone_change_token?: string;
      phone_change_sent_at?: string;
      confirmed_at?: string;
      email_change_token_current?: string;
      email_change_confirm_status?: string;
      banned_until?: string;
      reauthentication_token?: string;
      reauthentication_sent_at?: string;
      is_sso_user?: string;
      deleted_at?: string;
      identities?: string;
      mfa_factors?: string;
      sessions?: string;
      Profiles?: string;
    };
  }}
export type Alias = {
  inflection?: Inflection | boolean;
  override?: Override;
};
interface FingerprintRelationField {
  count?: number | MinMaxOption;
}
interface FingerprintJsonField {
  schema?: any;
}
interface FingerprintDateField {
  options?: {
    minYear?: number;
    maxYear?: number;
  }
}
interface FingerprintNumberField {
  options?: {
    min?: number;
    max?: number;
  }
}
export interface Fingerprint {
  Activites?: {
    created_at?: FingerprintDateField;
    do_date?: FingerprintDateField;
    trips_activites?: FingerprintRelationField;
  }
  Profiles?: {
    created_at?: FingerprintDateField;
    users?: FingerprintRelationField;
    trips_profiles?: FingerprintRelationField;
  }
  Trips?: {
    id?: FingerprintNumberField;
    created_at?: FingerprintDateField;
    start_date?: FingerprintDateField;
    end_date?: FingerprintDateField;
    trips_activites?: FingerprintRelationField;
    trips_profiles?: FingerprintRelationField;
  }
  _http_response?: {
    id?: FingerprintNumberField;
    status_code?: FingerprintNumberField;
    headers?: FingerprintJsonField;
    created?: FingerprintDateField;
  }
  audit_log_entries?: {
    payload?: FingerprintJsonField;
    created_at?: FingerprintDateField;
  }
  buckets?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    file_size_limit?: FingerprintNumberField;
    objects?: FingerprintRelationField;
  }
  flow_state?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    saml_relay_states?: FingerprintRelationField;
  }
  hooks?: {
    id?: FingerprintNumberField;
    hook_table_id?: FingerprintNumberField;
    created_at?: FingerprintDateField;
    request_id?: FingerprintNumberField;
  }
  http_request_queue?: {
    id?: FingerprintNumberField;
    headers?: FingerprintJsonField;
    timeout_milliseconds?: FingerprintNumberField;
  }
  identities?: {
    identity_data?: FingerprintJsonField;
    last_sign_in_at?: FingerprintDateField;
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    users?: FingerprintRelationField;
  }
  instances?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
  }
  key?: {
    created?: FingerprintDateField;
    expires?: FingerprintDateField;
    key_id?: FingerprintNumberField;
    key?: FingerprintRelationField;
    key?: FingerprintRelationField;
    secrets?: FingerprintRelationField;
  }
  mfa_amr_claims?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    sessions?: FingerprintRelationField;
  }
  mfa_challenges?: {
    created_at?: FingerprintDateField;
    verified_at?: FingerprintDateField;
    mfa_factors?: FingerprintRelationField;
  }
  mfa_factors?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    users?: FingerprintRelationField;
    mfa_challenges?: FingerprintRelationField;
  }
  storage_migrations?: {
    id?: FingerprintNumberField;
    executed_at?: FingerprintDateField;
  }
  supabase_functions_migrations?: {
    inserted_at?: FingerprintDateField;
  }
  objects?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    last_accessed_at?: FingerprintDateField;
    metadata?: FingerprintJsonField;
    buckets?: FingerprintRelationField;
  }
  refresh_tokens?: {
    id?: FingerprintNumberField;
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    sessions?: FingerprintRelationField;
  }
  saml_providers?: {
    attribute_mapping?: FingerprintJsonField;
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    sso_providers?: FingerprintRelationField;
  }
  saml_relay_states?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    flow_state?: FingerprintRelationField;
    sso_providers?: FingerprintRelationField;
  }
  auth_schema_migrations?: {

  }
  supabase_migrations_schema_migrations?: {

  }
  secrets?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    key?: FingerprintRelationField;
  }
  sessions?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    not_after?: FingerprintDateField;
    refreshed_at?: FingerprintDateField;
    users?: FingerprintRelationField;
    mfa_amr_claims?: FingerprintRelationField;
    refresh_tokens?: FingerprintRelationField;
  }
  sso_domains?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    sso_providers?: FingerprintRelationField;
  }
  sso_providers?: {
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    saml_providers?: FingerprintRelationField;
    saml_relay_states?: FingerprintRelationField;
    sso_domains?: FingerprintRelationField;
  }
  trips_activites?: {
    trip?: FingerprintNumberField;
    Activites?: FingerprintRelationField;
    Trips?: FingerprintRelationField;
  }
  trips_profiles?: {
    trip_id?: FingerprintNumberField;
    Profiles?: FingerprintRelationField;
    Trips?: FingerprintRelationField;
  }
  users?: {
    email_confirmed_at?: FingerprintDateField;
    invited_at?: FingerprintDateField;
    confirmation_sent_at?: FingerprintDateField;
    recovery_sent_at?: FingerprintDateField;
    email_change_sent_at?: FingerprintDateField;
    last_sign_in_at?: FingerprintDateField;
    raw_app_meta_data?: FingerprintJsonField;
    raw_user_meta_data?: FingerprintJsonField;
    created_at?: FingerprintDateField;
    updated_at?: FingerprintDateField;
    phone_confirmed_at?: FingerprintDateField;
    phone_change_sent_at?: FingerprintDateField;
    confirmed_at?: FingerprintDateField;
    email_change_confirm_status?: FingerprintNumberField;
    banned_until?: FingerprintDateField;
    reauthentication_sent_at?: FingerprintDateField;
    deleted_at?: FingerprintDateField;
    identities?: FingerprintRelationField;
    mfa_factors?: FingerprintRelationField;
    sessions?: FingerprintRelationField;
    Profiles?: FingerprintRelationField;
  }}