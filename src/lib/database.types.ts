export interface Database {
  public: {
    Tables: {
      completed_runs: {
        Row: {
          id: string;
          tag: string;
          function_name: string;
          output: string;
          completed_at: string;
        };
        Insert: {
          id: string;
          tag: string;
          function_name: string;
          output: string;
          completed_at?: string;
        };
        Update: {
          id?: string;
          tag?: string;
          function_name?: string;
          output?: string;
          completed_at?: string;
        };
      };
    };
  };
}
