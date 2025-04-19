interface ApiResponse<T> {
  results: T[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

interface CacheEntry<T> {
  data: ApiResponse<T>;
  timestamp: number;
}

interface CacheOptions {
  duration?: number;
  minimumLoadingTime?: number;
}

const DEFAULT_OPTIONS: CacheOptions = {
  duration: 5 * 60 * 1000, // 5 minutes
  minimumLoadingTime: 500,
};

class Cache {
  private static instance: Cache;
  private cache: Record<string, CacheEntry<any>> = {};
  private options: CacheOptions;

  private constructor(options: CacheOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  public static getInstance(options?: CacheOptions): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache(options);
    }
    return Cache.instance;
  }

  public get<T>(key: string): CacheEntry<T> | null {
    const entry = this.cache[key];
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > this.options.duration!;
    if (isExpired) {
      delete this.cache[key];
      return null;
    }

    return entry;
  }

  public set<T>(key: string, data: ApiResponse<T>): void {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }

  public clear(): void {
    this.cache = {};
  }

  public getMinimumLoadingTime(): number {
    return this.options.minimumLoadingTime!;
  }
}

export const cache = Cache.getInstance();
