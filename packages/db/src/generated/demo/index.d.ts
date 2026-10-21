
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>
/**
 * Model PspCredential
 * 
 */
export type PspCredential = $Result.DefaultSelection<Prisma.$PspCredentialPayload>
/**
 * Model PaymentIntent
 * 
 */
export type PaymentIntent = $Result.DefaultSelection<Prisma.$PaymentIntentPayload>
/**
 * Model Payout
 * 
 */
export type Payout = $Result.DefaultSelection<Prisma.$PayoutPayload>
/**
 * Model LedgerEntry
 * 
 */
export type LedgerEntry = $Result.DefaultSelection<Prisma.$LedgerEntryPayload>
/**
 * Model WebhookEvent
 * 
 */
export type WebhookEvent = $Result.DefaultSelection<Prisma.$WebhookEventPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model SubscriptionCycle
 * 
 */
export type SubscriptionCycle = $Result.DefaultSelection<Prisma.$SubscriptionCyclePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pspCredential`: Exposes CRUD operations for the **PspCredential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PspCredentials
    * const pspCredentials = await prisma.pspCredential.findMany()
    * ```
    */
  get pspCredential(): Prisma.PspCredentialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentIntent`: Exposes CRUD operations for the **PaymentIntent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentIntents
    * const paymentIntents = await prisma.paymentIntent.findMany()
    * ```
    */
  get paymentIntent(): Prisma.PaymentIntentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payout`: Exposes CRUD operations for the **Payout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payouts
    * const payouts = await prisma.payout.findMany()
    * ```
    */
  get payout(): Prisma.PayoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ledgerEntry`: Exposes CRUD operations for the **LedgerEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LedgerEntries
    * const ledgerEntries = await prisma.ledgerEntry.findMany()
    * ```
    */
  get ledgerEntry(): Prisma.LedgerEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookEvent`: Exposes CRUD operations for the **WebhookEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookEvents
    * const webhookEvents = await prisma.webhookEvent.findMany()
    * ```
    */
  get webhookEvent(): Prisma.WebhookEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriptionCycle`: Exposes CRUD operations for the **SubscriptionCycle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubscriptionCycles
    * const subscriptionCycles = await prisma.subscriptionCycle.findMany()
    * ```
    */
  get subscriptionCycle(): Prisma.SubscriptionCycleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tenant: 'Tenant',
    User: 'User',
    Plan: 'Plan',
    ApiKey: 'ApiKey',
    PspCredential: 'PspCredential',
    PaymentIntent: 'PaymentIntent',
    Payout: 'Payout',
    LedgerEntry: 'LedgerEntry',
    WebhookEvent: 'WebhookEvent',
    AuditLog: 'AuditLog',
    SubscriptionCycle: 'SubscriptionCycle'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "tenant" | "user" | "plan" | "apiKey" | "pspCredential" | "paymentIntent" | "payout" | "ledgerEntry" | "webhookEvent" | "auditLog" | "subscriptionCycle"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
      PspCredential: {
        payload: Prisma.$PspCredentialPayload<ExtArgs>
        fields: Prisma.PspCredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PspCredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PspCredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload>
          }
          findFirst: {
            args: Prisma.PspCredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PspCredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload>
          }
          findMany: {
            args: Prisma.PspCredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload>[]
          }
          create: {
            args: Prisma.PspCredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload>
          }
          createMany: {
            args: Prisma.PspCredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PspCredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload>[]
          }
          delete: {
            args: Prisma.PspCredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload>
          }
          update: {
            args: Prisma.PspCredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload>
          }
          deleteMany: {
            args: Prisma.PspCredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PspCredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PspCredentialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload>[]
          }
          upsert: {
            args: Prisma.PspCredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PspCredentialPayload>
          }
          aggregate: {
            args: Prisma.PspCredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePspCredential>
          }
          groupBy: {
            args: Prisma.PspCredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<PspCredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.PspCredentialCountArgs<ExtArgs>
            result: $Utils.Optional<PspCredentialCountAggregateOutputType> | number
          }
        }
      }
      PaymentIntent: {
        payload: Prisma.$PaymentIntentPayload<ExtArgs>
        fields: Prisma.PaymentIntentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentIntentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentIntentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          findFirst: {
            args: Prisma.PaymentIntentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentIntentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          findMany: {
            args: Prisma.PaymentIntentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>[]
          }
          create: {
            args: Prisma.PaymentIntentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          createMany: {
            args: Prisma.PaymentIntentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentIntentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>[]
          }
          delete: {
            args: Prisma.PaymentIntentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          update: {
            args: Prisma.PaymentIntentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentIntentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentIntentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentIntentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentIntentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentIntentPayload>
          }
          aggregate: {
            args: Prisma.PaymentIntentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentIntent>
          }
          groupBy: {
            args: Prisma.PaymentIntentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentIntentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentIntentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentIntentCountAggregateOutputType> | number
          }
        }
      }
      Payout: {
        payload: Prisma.$PayoutPayload<ExtArgs>
        fields: Prisma.PayoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          findFirst: {
            args: Prisma.PayoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          findMany: {
            args: Prisma.PayoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          create: {
            args: Prisma.PayoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          createMany: {
            args: Prisma.PayoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          delete: {
            args: Prisma.PayoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          update: {
            args: Prisma.PayoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          deleteMany: {
            args: Prisma.PayoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PayoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          upsert: {
            args: Prisma.PayoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          aggregate: {
            args: Prisma.PayoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayout>
          }
          groupBy: {
            args: Prisma.PayoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayoutCountArgs<ExtArgs>
            result: $Utils.Optional<PayoutCountAggregateOutputType> | number
          }
        }
      }
      LedgerEntry: {
        payload: Prisma.$LedgerEntryPayload<ExtArgs>
        fields: Prisma.LedgerEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LedgerEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LedgerEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          findFirst: {
            args: Prisma.LedgerEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LedgerEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          findMany: {
            args: Prisma.LedgerEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>[]
          }
          create: {
            args: Prisma.LedgerEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          createMany: {
            args: Prisma.LedgerEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LedgerEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>[]
          }
          delete: {
            args: Prisma.LedgerEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          update: {
            args: Prisma.LedgerEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          deleteMany: {
            args: Prisma.LedgerEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LedgerEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LedgerEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>[]
          }
          upsert: {
            args: Prisma.LedgerEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          aggregate: {
            args: Prisma.LedgerEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLedgerEntry>
          }
          groupBy: {
            args: Prisma.LedgerEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<LedgerEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.LedgerEntryCountArgs<ExtArgs>
            result: $Utils.Optional<LedgerEntryCountAggregateOutputType> | number
          }
        }
      }
      WebhookEvent: {
        payload: Prisma.$WebhookEventPayload<ExtArgs>
        fields: Prisma.WebhookEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          findFirst: {
            args: Prisma.WebhookEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          findMany: {
            args: Prisma.WebhookEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          create: {
            args: Prisma.WebhookEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          createMany: {
            args: Prisma.WebhookEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          delete: {
            args: Prisma.WebhookEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          update: {
            args: Prisma.WebhookEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          deleteMany: {
            args: Prisma.WebhookEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          upsert: {
            args: Prisma.WebhookEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          aggregate: {
            args: Prisma.WebhookEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookEvent>
          }
          groupBy: {
            args: Prisma.WebhookEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookEventCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      SubscriptionCycle: {
        payload: Prisma.$SubscriptionCyclePayload<ExtArgs>
        fields: Prisma.SubscriptionCycleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionCycleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionCycleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload>
          }
          findFirst: {
            args: Prisma.SubscriptionCycleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionCycleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload>
          }
          findMany: {
            args: Prisma.SubscriptionCycleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload>[]
          }
          create: {
            args: Prisma.SubscriptionCycleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload>
          }
          createMany: {
            args: Prisma.SubscriptionCycleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCycleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload>[]
          }
          delete: {
            args: Prisma.SubscriptionCycleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload>
          }
          update: {
            args: Prisma.SubscriptionCycleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionCycleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionCycleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionCycleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionCycleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCyclePayload>
          }
          aggregate: {
            args: Prisma.SubscriptionCycleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptionCycle>
          }
          groupBy: {
            args: Prisma.SubscriptionCycleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCycleGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCycleCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCycleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    tenant?: TenantOmit
    user?: UserOmit
    plan?: PlanOmit
    apiKey?: ApiKeyOmit
    pspCredential?: PspCredentialOmit
    paymentIntent?: PaymentIntentOmit
    payout?: PayoutOmit
    ledgerEntry?: LedgerEntryOmit
    webhookEvent?: WebhookEventOmit
    auditLog?: AuditLogOmit
    subscriptionCycle?: SubscriptionCycleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    users: number
    apiKeys: number
    credentials: number
    intents: number
    payouts: number
    ledgerEntries: number
    cycles: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | TenantCountOutputTypeCountUsersArgs
    apiKeys?: boolean | TenantCountOutputTypeCountApiKeysArgs
    credentials?: boolean | TenantCountOutputTypeCountCredentialsArgs
    intents?: boolean | TenantCountOutputTypeCountIntentsArgs
    payouts?: boolean | TenantCountOutputTypeCountPayoutsArgs
    ledgerEntries?: boolean | TenantCountOutputTypeCountLedgerEntriesArgs
    cycles?: boolean | TenantCountOutputTypeCountCyclesArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountApiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PspCredentialWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountIntentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentIntentWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountPayoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountLedgerEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerEntryWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountCyclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionCycleWhereInput
  }


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    tenants: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenants?: boolean | PlanCountOutputTypeCountTenantsArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountTenantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    status: string | null
    kycStatus: string | null
    planId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    status: string | null
    kycStatus: string | null
    planId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    status: number
    kycStatus: number
    planId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    status?: true
    kycStatus?: true
    planId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    status?: true
    kycStatus?: true
    planId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    status?: true
    kycStatus?: true
    planId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    name: string
    slug: string
    status: string
    kycStatus: string
    planId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    status?: boolean
    kycStatus?: boolean
    planId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | Tenant$planArgs<ExtArgs>
    users?: boolean | Tenant$usersArgs<ExtArgs>
    apiKeys?: boolean | Tenant$apiKeysArgs<ExtArgs>
    credentials?: boolean | Tenant$credentialsArgs<ExtArgs>
    intents?: boolean | Tenant$intentsArgs<ExtArgs>
    payouts?: boolean | Tenant$payoutsArgs<ExtArgs>
    ledgerEntries?: boolean | Tenant$ledgerEntriesArgs<ExtArgs>
    cycles?: boolean | Tenant$cyclesArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    status?: boolean
    kycStatus?: boolean
    planId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | Tenant$planArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    status?: boolean
    kycStatus?: boolean
    planId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | Tenant$planArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    status?: boolean
    kycStatus?: boolean
    planId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "status" | "kycStatus" | "planId" | "createdAt" | "updatedAt", ExtArgs["result"]["tenant"]>
  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | Tenant$planArgs<ExtArgs>
    users?: boolean | Tenant$usersArgs<ExtArgs>
    apiKeys?: boolean | Tenant$apiKeysArgs<ExtArgs>
    credentials?: boolean | Tenant$credentialsArgs<ExtArgs>
    intents?: boolean | Tenant$intentsArgs<ExtArgs>
    payouts?: boolean | Tenant$payoutsArgs<ExtArgs>
    ledgerEntries?: boolean | Tenant$ledgerEntriesArgs<ExtArgs>
    cycles?: boolean | Tenant$cyclesArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | Tenant$planArgs<ExtArgs>
  }
  export type TenantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | Tenant$planArgs<ExtArgs>
  }

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      plan: Prisma.$PlanPayload<ExtArgs> | null
      users: Prisma.$UserPayload<ExtArgs>[]
      apiKeys: Prisma.$ApiKeyPayload<ExtArgs>[]
      credentials: Prisma.$PspCredentialPayload<ExtArgs>[]
      intents: Prisma.$PaymentIntentPayload<ExtArgs>[]
      payouts: Prisma.$PayoutPayload<ExtArgs>[]
      ledgerEntries: Prisma.$LedgerEntryPayload<ExtArgs>[]
      cycles: Prisma.$SubscriptionCyclePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      status: string
      kycStatus: string
      planId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends Tenant$planArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$planArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends Tenant$usersArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    apiKeys<T extends Tenant$apiKeysArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$apiKeysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    credentials<T extends Tenant$credentialsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$credentialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    intents<T extends Tenant$intentsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$intentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payouts<T extends Tenant$payoutsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$payoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ledgerEntries<T extends Tenant$ledgerEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$ledgerEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cycles<T extends Tenant$cyclesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$cyclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly slug: FieldRef<"Tenant", 'String'>
    readonly status: FieldRef<"Tenant", 'String'>
    readonly kycStatus: FieldRef<"Tenant", 'String'>
    readonly planId: FieldRef<"Tenant", 'String'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant updateManyAndReturn
   */
  export type TenantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number
  }

  /**
   * Tenant.plan
   */
  export type Tenant$planArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    where?: PlanWhereInput
  }

  /**
   * Tenant.users
   */
  export type Tenant$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Tenant.apiKeys
   */
  export type Tenant$apiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    cursor?: ApiKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * Tenant.credentials
   */
  export type Tenant$credentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
    where?: PspCredentialWhereInput
    orderBy?: PspCredentialOrderByWithRelationInput | PspCredentialOrderByWithRelationInput[]
    cursor?: PspCredentialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PspCredentialScalarFieldEnum | PspCredentialScalarFieldEnum[]
  }

  /**
   * Tenant.intents
   */
  export type Tenant$intentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    where?: PaymentIntentWhereInput
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    cursor?: PaymentIntentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentIntentScalarFieldEnum | PaymentIntentScalarFieldEnum[]
  }

  /**
   * Tenant.payouts
   */
  export type Tenant$payoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    where?: PayoutWhereInput
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    cursor?: PayoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Tenant.ledgerEntries
   */
  export type Tenant$ledgerEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    where?: LedgerEntryWhereInput
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    cursor?: LedgerEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * Tenant.cycles
   */
  export type Tenant$cyclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
    where?: SubscriptionCycleWhereInput
    orderBy?: SubscriptionCycleOrderByWithRelationInput | SubscriptionCycleOrderByWithRelationInput[]
    cursor?: SubscriptionCycleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionCycleScalarFieldEnum | SubscriptionCycleScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    email: string | null
    name: string | null
    role: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    email: string | null
    name: string | null
    role: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    tenantId: number
    email: number
    name: number
    role: number
    passwordHash: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    tenantId?: true
    email?: true
    name?: true
    role?: true
    passwordHash?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    tenantId?: true
    email?: true
    name?: true
    role?: true
    passwordHash?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    tenantId?: true
    email?: true
    name?: true
    role?: true
    passwordHash?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    tenantId: string
    email: string
    name: string | null
    role: string
    passwordHash: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    tenantId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "email" | "name" | "role" | "passwordHash" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      email: string
      name: string | null
      role: string
      passwordHash: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly tenantId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    gmvThreshold: number | null
    monthlyPrice: number | null
  }

  export type PlanSumAggregateOutputType = {
    gmvThreshold: bigint | null
    monthlyPrice: bigint | null
  }

  export type PlanMinAggregateOutputType = {
    id: string | null
    name: string | null
    gmvThreshold: bigint | null
    monthlyPrice: bigint | null
  }

  export type PlanMaxAggregateOutputType = {
    id: string | null
    name: string | null
    gmvThreshold: bigint | null
    monthlyPrice: bigint | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    name: number
    gmvThreshold: number
    monthlyPrice: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    gmvThreshold?: true
    monthlyPrice?: true
  }

  export type PlanSumAggregateInputType = {
    gmvThreshold?: true
    monthlyPrice?: true
  }

  export type PlanMinAggregateInputType = {
    id?: true
    name?: true
    gmvThreshold?: true
    monthlyPrice?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    name?: true
    gmvThreshold?: true
    monthlyPrice?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    name?: true
    gmvThreshold?: true
    monthlyPrice?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: string
    name: string
    gmvThreshold: bigint
    monthlyPrice: bigint
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gmvThreshold?: boolean
    monthlyPrice?: boolean
    tenants?: boolean | Plan$tenantsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gmvThreshold?: boolean
    monthlyPrice?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gmvThreshold?: boolean
    monthlyPrice?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    id?: boolean
    name?: boolean
    gmvThreshold?: boolean
    monthlyPrice?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "gmvThreshold" | "monthlyPrice", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenants?: boolean | Plan$tenantsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      tenants: Prisma.$TenantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      gmvThreshold: bigint
      monthlyPrice: bigint
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans and returns the data updated in the database.
     * @param {PlanUpdateManyAndReturnArgs} args - Arguments to update many Plans.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenants<T extends Plan$tenantsArgs<ExtArgs> = {}>(args?: Subset<T, Plan$tenantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'String'>
    readonly name: FieldRef<"Plan", 'String'>
    readonly gmvThreshold: FieldRef<"Plan", 'BigInt'>
    readonly monthlyPrice: FieldRef<"Plan", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan updateManyAndReturn
   */
  export type PlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.tenants
   */
  export type Plan$tenantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    cursor?: TenantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    prefix: string | null
    keyHash: string | null
    lastUsedAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    prefix: string | null
    keyHash: string | null
    lastUsedAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    prefix: number
    keyHash: number
    lastUsedAt: number
    revokedAt: number
    createdAt: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    prefix?: true
    keyHash?: true
    lastUsedAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    prefix?: true
    keyHash?: true
    lastUsedAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    prefix?: true
    keyHash?: true
    lastUsedAt?: true
    revokedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    prefix: string
    keyHash: string
    lastUsedAt: Date | null
    revokedAt: Date | null
    createdAt: Date
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    prefix?: boolean
    keyHash?: boolean
    lastUsedAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    prefix?: boolean
    keyHash?: boolean
    lastUsedAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    prefix?: boolean
    keyHash?: boolean
    lastUsedAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    prefix?: boolean
    keyHash?: boolean
    lastUsedAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
  }

  export type ApiKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "prefix" | "keyHash" | "lastUsedAt" | "revokedAt" | "createdAt", ExtArgs["result"]["apiKey"]>
  export type ApiKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      prefix: string
      keyHash: string
      lastUsedAt: Date | null
      revokedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys and returns the data updated in the database.
     * @param {ApiKeyUpdateManyAndReturnArgs} args - Arguments to update many ApiKeys.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApiKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiKey model
   */
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly tenantId: FieldRef<"ApiKey", 'String'>
    readonly name: FieldRef<"ApiKey", 'String'>
    readonly prefix: FieldRef<"ApiKey", 'String'>
    readonly keyHash: FieldRef<"ApiKey", 'String'>
    readonly lastUsedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly revokedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey updateManyAndReturn
   */
  export type ApiKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to delete.
     */
    limit?: number
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
  }


  /**
   * Model PspCredential
   */

  export type AggregatePspCredential = {
    _count: PspCredentialCountAggregateOutputType | null
    _min: PspCredentialMinAggregateOutputType | null
    _max: PspCredentialMaxAggregateOutputType | null
  }

  export type PspCredentialMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: string | null
    encryptedKeys: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PspCredentialMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: string | null
    encryptedKeys: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PspCredentialCountAggregateOutputType = {
    id: number
    tenantId: number
    provider: number
    encryptedKeys: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PspCredentialMinAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    encryptedKeys?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PspCredentialMaxAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    encryptedKeys?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PspCredentialCountAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    encryptedKeys?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PspCredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PspCredential to aggregate.
     */
    where?: PspCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PspCredentials to fetch.
     */
    orderBy?: PspCredentialOrderByWithRelationInput | PspCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PspCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PspCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PspCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PspCredentials
    **/
    _count?: true | PspCredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PspCredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PspCredentialMaxAggregateInputType
  }

  export type GetPspCredentialAggregateType<T extends PspCredentialAggregateArgs> = {
        [P in keyof T & keyof AggregatePspCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePspCredential[P]>
      : GetScalarType<T[P], AggregatePspCredential[P]>
  }




  export type PspCredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PspCredentialWhereInput
    orderBy?: PspCredentialOrderByWithAggregationInput | PspCredentialOrderByWithAggregationInput[]
    by: PspCredentialScalarFieldEnum[] | PspCredentialScalarFieldEnum
    having?: PspCredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PspCredentialCountAggregateInputType | true
    _min?: PspCredentialMinAggregateInputType
    _max?: PspCredentialMaxAggregateInputType
  }

  export type PspCredentialGroupByOutputType = {
    id: string
    tenantId: string
    provider: string
    encryptedKeys: string
    createdAt: Date
    updatedAt: Date
    _count: PspCredentialCountAggregateOutputType | null
    _min: PspCredentialMinAggregateOutputType | null
    _max: PspCredentialMaxAggregateOutputType | null
  }

  type GetPspCredentialGroupByPayload<T extends PspCredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PspCredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PspCredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PspCredentialGroupByOutputType[P]>
            : GetScalarType<T[P], PspCredentialGroupByOutputType[P]>
        }
      >
    >


  export type PspCredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    encryptedKeys?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pspCredential"]>

  export type PspCredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    encryptedKeys?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pspCredential"]>

  export type PspCredentialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    encryptedKeys?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pspCredential"]>

  export type PspCredentialSelectScalar = {
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    encryptedKeys?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PspCredentialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "provider" | "encryptedKeys" | "createdAt" | "updatedAt", ExtArgs["result"]["pspCredential"]>
  export type PspCredentialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type PspCredentialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type PspCredentialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $PspCredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PspCredential"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      provider: string
      encryptedKeys: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pspCredential"]>
    composites: {}
  }

  type PspCredentialGetPayload<S extends boolean | null | undefined | PspCredentialDefaultArgs> = $Result.GetResult<Prisma.$PspCredentialPayload, S>

  type PspCredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PspCredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PspCredentialCountAggregateInputType | true
    }

  export interface PspCredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PspCredential'], meta: { name: 'PspCredential' } }
    /**
     * Find zero or one PspCredential that matches the filter.
     * @param {PspCredentialFindUniqueArgs} args - Arguments to find a PspCredential
     * @example
     * // Get one PspCredential
     * const pspCredential = await prisma.pspCredential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PspCredentialFindUniqueArgs>(args: SelectSubset<T, PspCredentialFindUniqueArgs<ExtArgs>>): Prisma__PspCredentialClient<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PspCredential that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PspCredentialFindUniqueOrThrowArgs} args - Arguments to find a PspCredential
     * @example
     * // Get one PspCredential
     * const pspCredential = await prisma.pspCredential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PspCredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, PspCredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PspCredentialClient<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PspCredential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PspCredentialFindFirstArgs} args - Arguments to find a PspCredential
     * @example
     * // Get one PspCredential
     * const pspCredential = await prisma.pspCredential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PspCredentialFindFirstArgs>(args?: SelectSubset<T, PspCredentialFindFirstArgs<ExtArgs>>): Prisma__PspCredentialClient<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PspCredential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PspCredentialFindFirstOrThrowArgs} args - Arguments to find a PspCredential
     * @example
     * // Get one PspCredential
     * const pspCredential = await prisma.pspCredential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PspCredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, PspCredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__PspCredentialClient<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PspCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PspCredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PspCredentials
     * const pspCredentials = await prisma.pspCredential.findMany()
     * 
     * // Get first 10 PspCredentials
     * const pspCredentials = await prisma.pspCredential.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pspCredentialWithIdOnly = await prisma.pspCredential.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PspCredentialFindManyArgs>(args?: SelectSubset<T, PspCredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PspCredential.
     * @param {PspCredentialCreateArgs} args - Arguments to create a PspCredential.
     * @example
     * // Create one PspCredential
     * const PspCredential = await prisma.pspCredential.create({
     *   data: {
     *     // ... data to create a PspCredential
     *   }
     * })
     * 
     */
    create<T extends PspCredentialCreateArgs>(args: SelectSubset<T, PspCredentialCreateArgs<ExtArgs>>): Prisma__PspCredentialClient<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PspCredentials.
     * @param {PspCredentialCreateManyArgs} args - Arguments to create many PspCredentials.
     * @example
     * // Create many PspCredentials
     * const pspCredential = await prisma.pspCredential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PspCredentialCreateManyArgs>(args?: SelectSubset<T, PspCredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PspCredentials and returns the data saved in the database.
     * @param {PspCredentialCreateManyAndReturnArgs} args - Arguments to create many PspCredentials.
     * @example
     * // Create many PspCredentials
     * const pspCredential = await prisma.pspCredential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PspCredentials and only return the `id`
     * const pspCredentialWithIdOnly = await prisma.pspCredential.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PspCredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, PspCredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PspCredential.
     * @param {PspCredentialDeleteArgs} args - Arguments to delete one PspCredential.
     * @example
     * // Delete one PspCredential
     * const PspCredential = await prisma.pspCredential.delete({
     *   where: {
     *     // ... filter to delete one PspCredential
     *   }
     * })
     * 
     */
    delete<T extends PspCredentialDeleteArgs>(args: SelectSubset<T, PspCredentialDeleteArgs<ExtArgs>>): Prisma__PspCredentialClient<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PspCredential.
     * @param {PspCredentialUpdateArgs} args - Arguments to update one PspCredential.
     * @example
     * // Update one PspCredential
     * const pspCredential = await prisma.pspCredential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PspCredentialUpdateArgs>(args: SelectSubset<T, PspCredentialUpdateArgs<ExtArgs>>): Prisma__PspCredentialClient<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PspCredentials.
     * @param {PspCredentialDeleteManyArgs} args - Arguments to filter PspCredentials to delete.
     * @example
     * // Delete a few PspCredentials
     * const { count } = await prisma.pspCredential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PspCredentialDeleteManyArgs>(args?: SelectSubset<T, PspCredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PspCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PspCredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PspCredentials
     * const pspCredential = await prisma.pspCredential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PspCredentialUpdateManyArgs>(args: SelectSubset<T, PspCredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PspCredentials and returns the data updated in the database.
     * @param {PspCredentialUpdateManyAndReturnArgs} args - Arguments to update many PspCredentials.
     * @example
     * // Update many PspCredentials
     * const pspCredential = await prisma.pspCredential.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PspCredentials and only return the `id`
     * const pspCredentialWithIdOnly = await prisma.pspCredential.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PspCredentialUpdateManyAndReturnArgs>(args: SelectSubset<T, PspCredentialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PspCredential.
     * @param {PspCredentialUpsertArgs} args - Arguments to update or create a PspCredential.
     * @example
     * // Update or create a PspCredential
     * const pspCredential = await prisma.pspCredential.upsert({
     *   create: {
     *     // ... data to create a PspCredential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PspCredential we want to update
     *   }
     * })
     */
    upsert<T extends PspCredentialUpsertArgs>(args: SelectSubset<T, PspCredentialUpsertArgs<ExtArgs>>): Prisma__PspCredentialClient<$Result.GetResult<Prisma.$PspCredentialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PspCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PspCredentialCountArgs} args - Arguments to filter PspCredentials to count.
     * @example
     * // Count the number of PspCredentials
     * const count = await prisma.pspCredential.count({
     *   where: {
     *     // ... the filter for the PspCredentials we want to count
     *   }
     * })
    **/
    count<T extends PspCredentialCountArgs>(
      args?: Subset<T, PspCredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PspCredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PspCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PspCredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PspCredentialAggregateArgs>(args: Subset<T, PspCredentialAggregateArgs>): Prisma.PrismaPromise<GetPspCredentialAggregateType<T>>

    /**
     * Group by PspCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PspCredentialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PspCredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PspCredentialGroupByArgs['orderBy'] }
        : { orderBy?: PspCredentialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PspCredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPspCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PspCredential model
   */
  readonly fields: PspCredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PspCredential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PspCredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PspCredential model
   */
  interface PspCredentialFieldRefs {
    readonly id: FieldRef<"PspCredential", 'String'>
    readonly tenantId: FieldRef<"PspCredential", 'String'>
    readonly provider: FieldRef<"PspCredential", 'String'>
    readonly encryptedKeys: FieldRef<"PspCredential", 'String'>
    readonly createdAt: FieldRef<"PspCredential", 'DateTime'>
    readonly updatedAt: FieldRef<"PspCredential", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PspCredential findUnique
   */
  export type PspCredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
    /**
     * Filter, which PspCredential to fetch.
     */
    where: PspCredentialWhereUniqueInput
  }

  /**
   * PspCredential findUniqueOrThrow
   */
  export type PspCredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
    /**
     * Filter, which PspCredential to fetch.
     */
    where: PspCredentialWhereUniqueInput
  }

  /**
   * PspCredential findFirst
   */
  export type PspCredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
    /**
     * Filter, which PspCredential to fetch.
     */
    where?: PspCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PspCredentials to fetch.
     */
    orderBy?: PspCredentialOrderByWithRelationInput | PspCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PspCredentials.
     */
    cursor?: PspCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PspCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PspCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PspCredentials.
     */
    distinct?: PspCredentialScalarFieldEnum | PspCredentialScalarFieldEnum[]
  }

  /**
   * PspCredential findFirstOrThrow
   */
  export type PspCredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
    /**
     * Filter, which PspCredential to fetch.
     */
    where?: PspCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PspCredentials to fetch.
     */
    orderBy?: PspCredentialOrderByWithRelationInput | PspCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PspCredentials.
     */
    cursor?: PspCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PspCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PspCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PspCredentials.
     */
    distinct?: PspCredentialScalarFieldEnum | PspCredentialScalarFieldEnum[]
  }

  /**
   * PspCredential findMany
   */
  export type PspCredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
    /**
     * Filter, which PspCredentials to fetch.
     */
    where?: PspCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PspCredentials to fetch.
     */
    orderBy?: PspCredentialOrderByWithRelationInput | PspCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PspCredentials.
     */
    cursor?: PspCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PspCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PspCredentials.
     */
    skip?: number
    distinct?: PspCredentialScalarFieldEnum | PspCredentialScalarFieldEnum[]
  }

  /**
   * PspCredential create
   */
  export type PspCredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
    /**
     * The data needed to create a PspCredential.
     */
    data: XOR<PspCredentialCreateInput, PspCredentialUncheckedCreateInput>
  }

  /**
   * PspCredential createMany
   */
  export type PspCredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PspCredentials.
     */
    data: PspCredentialCreateManyInput | PspCredentialCreateManyInput[]
  }

  /**
   * PspCredential createManyAndReturn
   */
  export type PspCredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * The data used to create many PspCredentials.
     */
    data: PspCredentialCreateManyInput | PspCredentialCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PspCredential update
   */
  export type PspCredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
    /**
     * The data needed to update a PspCredential.
     */
    data: XOR<PspCredentialUpdateInput, PspCredentialUncheckedUpdateInput>
    /**
     * Choose, which PspCredential to update.
     */
    where: PspCredentialWhereUniqueInput
  }

  /**
   * PspCredential updateMany
   */
  export type PspCredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PspCredentials.
     */
    data: XOR<PspCredentialUpdateManyMutationInput, PspCredentialUncheckedUpdateManyInput>
    /**
     * Filter which PspCredentials to update
     */
    where?: PspCredentialWhereInput
    /**
     * Limit how many PspCredentials to update.
     */
    limit?: number
  }

  /**
   * PspCredential updateManyAndReturn
   */
  export type PspCredentialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * The data used to update PspCredentials.
     */
    data: XOR<PspCredentialUpdateManyMutationInput, PspCredentialUncheckedUpdateManyInput>
    /**
     * Filter which PspCredentials to update
     */
    where?: PspCredentialWhereInput
    /**
     * Limit how many PspCredentials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PspCredential upsert
   */
  export type PspCredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
    /**
     * The filter to search for the PspCredential to update in case it exists.
     */
    where: PspCredentialWhereUniqueInput
    /**
     * In case the PspCredential found by the `where` argument doesn't exist, create a new PspCredential with this data.
     */
    create: XOR<PspCredentialCreateInput, PspCredentialUncheckedCreateInput>
    /**
     * In case the PspCredential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PspCredentialUpdateInput, PspCredentialUncheckedUpdateInput>
  }

  /**
   * PspCredential delete
   */
  export type PspCredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
    /**
     * Filter which PspCredential to delete.
     */
    where: PspCredentialWhereUniqueInput
  }

  /**
   * PspCredential deleteMany
   */
  export type PspCredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PspCredentials to delete
     */
    where?: PspCredentialWhereInput
    /**
     * Limit how many PspCredentials to delete.
     */
    limit?: number
  }

  /**
   * PspCredential without action
   */
  export type PspCredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PspCredential
     */
    select?: PspCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PspCredential
     */
    omit?: PspCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PspCredentialInclude<ExtArgs> | null
  }


  /**
   * Model PaymentIntent
   */

  export type AggregatePaymentIntent = {
    _count: PaymentIntentCountAggregateOutputType | null
    _avg: PaymentIntentAvgAggregateOutputType | null
    _sum: PaymentIntentSumAggregateOutputType | null
    _min: PaymentIntentMinAggregateOutputType | null
    _max: PaymentIntentMaxAggregateOutputType | null
  }

  export type PaymentIntentAvgAggregateOutputType = {
    amountCents: number | null
  }

  export type PaymentIntentSumAggregateOutputType = {
    amountCents: bigint | null
  }

  export type PaymentIntentMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: string | null
    amountCents: bigint | null
    currency: string | null
    status: string | null
    idempotencyKey: string | null
    externalRef: string | null
    metadata: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentIntentMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: string | null
    amountCents: bigint | null
    currency: string | null
    status: string | null
    idempotencyKey: string | null
    externalRef: string | null
    metadata: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentIntentCountAggregateOutputType = {
    id: number
    tenantId: number
    provider: number
    amountCents: number
    currency: number
    status: number
    idempotencyKey: number
    externalRef: number
    metadata: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentIntentAvgAggregateInputType = {
    amountCents?: true
  }

  export type PaymentIntentSumAggregateInputType = {
    amountCents?: true
  }

  export type PaymentIntentMinAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    amountCents?: true
    currency?: true
    status?: true
    idempotencyKey?: true
    externalRef?: true
    metadata?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentIntentMaxAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    amountCents?: true
    currency?: true
    status?: true
    idempotencyKey?: true
    externalRef?: true
    metadata?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentIntentCountAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    amountCents?: true
    currency?: true
    status?: true
    idempotencyKey?: true
    externalRef?: true
    metadata?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentIntentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentIntent to aggregate.
     */
    where?: PaymentIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentIntents to fetch.
     */
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentIntents
    **/
    _count?: true | PaymentIntentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentIntentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentIntentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentIntentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentIntentMaxAggregateInputType
  }

  export type GetPaymentIntentAggregateType<T extends PaymentIntentAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentIntent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentIntent[P]>
      : GetScalarType<T[P], AggregatePaymentIntent[P]>
  }




  export type PaymentIntentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentIntentWhereInput
    orderBy?: PaymentIntentOrderByWithAggregationInput | PaymentIntentOrderByWithAggregationInput[]
    by: PaymentIntentScalarFieldEnum[] | PaymentIntentScalarFieldEnum
    having?: PaymentIntentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentIntentCountAggregateInputType | true
    _avg?: PaymentIntentAvgAggregateInputType
    _sum?: PaymentIntentSumAggregateInputType
    _min?: PaymentIntentMinAggregateInputType
    _max?: PaymentIntentMaxAggregateInputType
  }

  export type PaymentIntentGroupByOutputType = {
    id: string
    tenantId: string
    provider: string
    amountCents: bigint
    currency: string
    status: string
    idempotencyKey: string
    externalRef: string | null
    metadata: string | null
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentIntentCountAggregateOutputType | null
    _avg: PaymentIntentAvgAggregateOutputType | null
    _sum: PaymentIntentSumAggregateOutputType | null
    _min: PaymentIntentMinAggregateOutputType | null
    _max: PaymentIntentMaxAggregateOutputType | null
  }

  type GetPaymentIntentGroupByPayload<T extends PaymentIntentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentIntentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentIntentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentIntentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentIntentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentIntentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    amountCents?: boolean
    currency?: boolean
    status?: boolean
    idempotencyKey?: boolean
    externalRef?: boolean
    metadata?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentIntent"]>

  export type PaymentIntentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    amountCents?: boolean
    currency?: boolean
    status?: boolean
    idempotencyKey?: boolean
    externalRef?: boolean
    metadata?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentIntent"]>

  export type PaymentIntentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    amountCents?: boolean
    currency?: boolean
    status?: boolean
    idempotencyKey?: boolean
    externalRef?: boolean
    metadata?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentIntent"]>

  export type PaymentIntentSelectScalar = {
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    amountCents?: boolean
    currency?: boolean
    status?: boolean
    idempotencyKey?: boolean
    externalRef?: boolean
    metadata?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentIntentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "provider" | "amountCents" | "currency" | "status" | "idempotencyKey" | "externalRef" | "metadata" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["paymentIntent"]>
  export type PaymentIntentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type PaymentIntentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type PaymentIntentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $PaymentIntentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentIntent"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      provider: string
      amountCents: bigint
      currency: string
      status: string
      idempotencyKey: string
      externalRef: string | null
      metadata: string | null
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentIntent"]>
    composites: {}
  }

  type PaymentIntentGetPayload<S extends boolean | null | undefined | PaymentIntentDefaultArgs> = $Result.GetResult<Prisma.$PaymentIntentPayload, S>

  type PaymentIntentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentIntentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentIntentCountAggregateInputType | true
    }

  export interface PaymentIntentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentIntent'], meta: { name: 'PaymentIntent' } }
    /**
     * Find zero or one PaymentIntent that matches the filter.
     * @param {PaymentIntentFindUniqueArgs} args - Arguments to find a PaymentIntent
     * @example
     * // Get one PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentIntentFindUniqueArgs>(args: SelectSubset<T, PaymentIntentFindUniqueArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentIntent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentIntentFindUniqueOrThrowArgs} args - Arguments to find a PaymentIntent
     * @example
     * // Get one PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentIntentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentIntentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentIntent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentFindFirstArgs} args - Arguments to find a PaymentIntent
     * @example
     * // Get one PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentIntentFindFirstArgs>(args?: SelectSubset<T, PaymentIntentFindFirstArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentIntent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentFindFirstOrThrowArgs} args - Arguments to find a PaymentIntent
     * @example
     * // Get one PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentIntentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentIntentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentIntents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentIntents
     * const paymentIntents = await prisma.paymentIntent.findMany()
     * 
     * // Get first 10 PaymentIntents
     * const paymentIntents = await prisma.paymentIntent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentIntentWithIdOnly = await prisma.paymentIntent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentIntentFindManyArgs>(args?: SelectSubset<T, PaymentIntentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentIntent.
     * @param {PaymentIntentCreateArgs} args - Arguments to create a PaymentIntent.
     * @example
     * // Create one PaymentIntent
     * const PaymentIntent = await prisma.paymentIntent.create({
     *   data: {
     *     // ... data to create a PaymentIntent
     *   }
     * })
     * 
     */
    create<T extends PaymentIntentCreateArgs>(args: SelectSubset<T, PaymentIntentCreateArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentIntents.
     * @param {PaymentIntentCreateManyArgs} args - Arguments to create many PaymentIntents.
     * @example
     * // Create many PaymentIntents
     * const paymentIntent = await prisma.paymentIntent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentIntentCreateManyArgs>(args?: SelectSubset<T, PaymentIntentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentIntents and returns the data saved in the database.
     * @param {PaymentIntentCreateManyAndReturnArgs} args - Arguments to create many PaymentIntents.
     * @example
     * // Create many PaymentIntents
     * const paymentIntent = await prisma.paymentIntent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentIntents and only return the `id`
     * const paymentIntentWithIdOnly = await prisma.paymentIntent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentIntentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentIntentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentIntent.
     * @param {PaymentIntentDeleteArgs} args - Arguments to delete one PaymentIntent.
     * @example
     * // Delete one PaymentIntent
     * const PaymentIntent = await prisma.paymentIntent.delete({
     *   where: {
     *     // ... filter to delete one PaymentIntent
     *   }
     * })
     * 
     */
    delete<T extends PaymentIntentDeleteArgs>(args: SelectSubset<T, PaymentIntentDeleteArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentIntent.
     * @param {PaymentIntentUpdateArgs} args - Arguments to update one PaymentIntent.
     * @example
     * // Update one PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentIntentUpdateArgs>(args: SelectSubset<T, PaymentIntentUpdateArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentIntents.
     * @param {PaymentIntentDeleteManyArgs} args - Arguments to filter PaymentIntents to delete.
     * @example
     * // Delete a few PaymentIntents
     * const { count } = await prisma.paymentIntent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentIntentDeleteManyArgs>(args?: SelectSubset<T, PaymentIntentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentIntents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentIntents
     * const paymentIntent = await prisma.paymentIntent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentIntentUpdateManyArgs>(args: SelectSubset<T, PaymentIntentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentIntents and returns the data updated in the database.
     * @param {PaymentIntentUpdateManyAndReturnArgs} args - Arguments to update many PaymentIntents.
     * @example
     * // Update many PaymentIntents
     * const paymentIntent = await prisma.paymentIntent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentIntents and only return the `id`
     * const paymentIntentWithIdOnly = await prisma.paymentIntent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentIntentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentIntentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentIntent.
     * @param {PaymentIntentUpsertArgs} args - Arguments to update or create a PaymentIntent.
     * @example
     * // Update or create a PaymentIntent
     * const paymentIntent = await prisma.paymentIntent.upsert({
     *   create: {
     *     // ... data to create a PaymentIntent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentIntent we want to update
     *   }
     * })
     */
    upsert<T extends PaymentIntentUpsertArgs>(args: SelectSubset<T, PaymentIntentUpsertArgs<ExtArgs>>): Prisma__PaymentIntentClient<$Result.GetResult<Prisma.$PaymentIntentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentIntents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentCountArgs} args - Arguments to filter PaymentIntents to count.
     * @example
     * // Count the number of PaymentIntents
     * const count = await prisma.paymentIntent.count({
     *   where: {
     *     // ... the filter for the PaymentIntents we want to count
     *   }
     * })
    **/
    count<T extends PaymentIntentCountArgs>(
      args?: Subset<T, PaymentIntentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentIntentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentIntent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentIntentAggregateArgs>(args: Subset<T, PaymentIntentAggregateArgs>): Prisma.PrismaPromise<GetPaymentIntentAggregateType<T>>

    /**
     * Group by PaymentIntent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentIntentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentIntentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentIntentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentIntentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentIntentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentIntentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentIntent model
   */
  readonly fields: PaymentIntentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentIntent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentIntentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentIntent model
   */
  interface PaymentIntentFieldRefs {
    readonly id: FieldRef<"PaymentIntent", 'String'>
    readonly tenantId: FieldRef<"PaymentIntent", 'String'>
    readonly provider: FieldRef<"PaymentIntent", 'String'>
    readonly amountCents: FieldRef<"PaymentIntent", 'BigInt'>
    readonly currency: FieldRef<"PaymentIntent", 'String'>
    readonly status: FieldRef<"PaymentIntent", 'String'>
    readonly idempotencyKey: FieldRef<"PaymentIntent", 'String'>
    readonly externalRef: FieldRef<"PaymentIntent", 'String'>
    readonly metadata: FieldRef<"PaymentIntent", 'String'>
    readonly expiresAt: FieldRef<"PaymentIntent", 'DateTime'>
    readonly createdAt: FieldRef<"PaymentIntent", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentIntent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentIntent findUnique
   */
  export type PaymentIntentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter, which PaymentIntent to fetch.
     */
    where: PaymentIntentWhereUniqueInput
  }

  /**
   * PaymentIntent findUniqueOrThrow
   */
  export type PaymentIntentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter, which PaymentIntent to fetch.
     */
    where: PaymentIntentWhereUniqueInput
  }

  /**
   * PaymentIntent findFirst
   */
  export type PaymentIntentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter, which PaymentIntent to fetch.
     */
    where?: PaymentIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentIntents to fetch.
     */
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentIntents.
     */
    cursor?: PaymentIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentIntents.
     */
    distinct?: PaymentIntentScalarFieldEnum | PaymentIntentScalarFieldEnum[]
  }

  /**
   * PaymentIntent findFirstOrThrow
   */
  export type PaymentIntentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter, which PaymentIntent to fetch.
     */
    where?: PaymentIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentIntents to fetch.
     */
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentIntents.
     */
    cursor?: PaymentIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentIntents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentIntents.
     */
    distinct?: PaymentIntentScalarFieldEnum | PaymentIntentScalarFieldEnum[]
  }

  /**
   * PaymentIntent findMany
   */
  export type PaymentIntentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter, which PaymentIntents to fetch.
     */
    where?: PaymentIntentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentIntents to fetch.
     */
    orderBy?: PaymentIntentOrderByWithRelationInput | PaymentIntentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentIntents.
     */
    cursor?: PaymentIntentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentIntents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentIntents.
     */
    skip?: number
    distinct?: PaymentIntentScalarFieldEnum | PaymentIntentScalarFieldEnum[]
  }

  /**
   * PaymentIntent create
   */
  export type PaymentIntentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentIntent.
     */
    data: XOR<PaymentIntentCreateInput, PaymentIntentUncheckedCreateInput>
  }

  /**
   * PaymentIntent createMany
   */
  export type PaymentIntentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentIntents.
     */
    data: PaymentIntentCreateManyInput | PaymentIntentCreateManyInput[]
  }

  /**
   * PaymentIntent createManyAndReturn
   */
  export type PaymentIntentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentIntents.
     */
    data: PaymentIntentCreateManyInput | PaymentIntentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentIntent update
   */
  export type PaymentIntentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentIntent.
     */
    data: XOR<PaymentIntentUpdateInput, PaymentIntentUncheckedUpdateInput>
    /**
     * Choose, which PaymentIntent to update.
     */
    where: PaymentIntentWhereUniqueInput
  }

  /**
   * PaymentIntent updateMany
   */
  export type PaymentIntentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentIntents.
     */
    data: XOR<PaymentIntentUpdateManyMutationInput, PaymentIntentUncheckedUpdateManyInput>
    /**
     * Filter which PaymentIntents to update
     */
    where?: PaymentIntentWhereInput
    /**
     * Limit how many PaymentIntents to update.
     */
    limit?: number
  }

  /**
   * PaymentIntent updateManyAndReturn
   */
  export type PaymentIntentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * The data used to update PaymentIntents.
     */
    data: XOR<PaymentIntentUpdateManyMutationInput, PaymentIntentUncheckedUpdateManyInput>
    /**
     * Filter which PaymentIntents to update
     */
    where?: PaymentIntentWhereInput
    /**
     * Limit how many PaymentIntents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentIntent upsert
   */
  export type PaymentIntentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentIntent to update in case it exists.
     */
    where: PaymentIntentWhereUniqueInput
    /**
     * In case the PaymentIntent found by the `where` argument doesn't exist, create a new PaymentIntent with this data.
     */
    create: XOR<PaymentIntentCreateInput, PaymentIntentUncheckedCreateInput>
    /**
     * In case the PaymentIntent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentIntentUpdateInput, PaymentIntentUncheckedUpdateInput>
  }

  /**
   * PaymentIntent delete
   */
  export type PaymentIntentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
    /**
     * Filter which PaymentIntent to delete.
     */
    where: PaymentIntentWhereUniqueInput
  }

  /**
   * PaymentIntent deleteMany
   */
  export type PaymentIntentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentIntents to delete
     */
    where?: PaymentIntentWhereInput
    /**
     * Limit how many PaymentIntents to delete.
     */
    limit?: number
  }

  /**
   * PaymentIntent without action
   */
  export type PaymentIntentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentIntent
     */
    select?: PaymentIntentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentIntent
     */
    omit?: PaymentIntentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIntentInclude<ExtArgs> | null
  }


  /**
   * Model Payout
   */

  export type AggregatePayout = {
    _count: PayoutCountAggregateOutputType | null
    _avg: PayoutAvgAggregateOutputType | null
    _sum: PayoutSumAggregateOutputType | null
    _min: PayoutMinAggregateOutputType | null
    _max: PayoutMaxAggregateOutputType | null
  }

  export type PayoutAvgAggregateOutputType = {
    amountCents: number | null
  }

  export type PayoutSumAggregateOutputType = {
    amountCents: bigint | null
  }

  export type PayoutMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: string | null
    payeeRef: string | null
    amountCents: bigint | null
    currency: string | null
    status: string | null
    idempotencyKey: string | null
    externalRef: string | null
    createdByUserId: string | null
    approvedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PayoutMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: string | null
    payeeRef: string | null
    amountCents: bigint | null
    currency: string | null
    status: string | null
    idempotencyKey: string | null
    externalRef: string | null
    createdByUserId: string | null
    approvedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PayoutCountAggregateOutputType = {
    id: number
    tenantId: number
    provider: number
    payeeRef: number
    amountCents: number
    currency: number
    status: number
    idempotencyKey: number
    externalRef: number
    createdByUserId: number
    approvedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PayoutAvgAggregateInputType = {
    amountCents?: true
  }

  export type PayoutSumAggregateInputType = {
    amountCents?: true
  }

  export type PayoutMinAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    payeeRef?: true
    amountCents?: true
    currency?: true
    status?: true
    idempotencyKey?: true
    externalRef?: true
    createdByUserId?: true
    approvedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PayoutMaxAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    payeeRef?: true
    amountCents?: true
    currency?: true
    status?: true
    idempotencyKey?: true
    externalRef?: true
    createdByUserId?: true
    approvedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PayoutCountAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    payeeRef?: true
    amountCents?: true
    currency?: true
    status?: true
    idempotencyKey?: true
    externalRef?: true
    createdByUserId?: true
    approvedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PayoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payout to aggregate.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payouts
    **/
    _count?: true | PayoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayoutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayoutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayoutMaxAggregateInputType
  }

  export type GetPayoutAggregateType<T extends PayoutAggregateArgs> = {
        [P in keyof T & keyof AggregatePayout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayout[P]>
      : GetScalarType<T[P], AggregatePayout[P]>
  }




  export type PayoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutWhereInput
    orderBy?: PayoutOrderByWithAggregationInput | PayoutOrderByWithAggregationInput[]
    by: PayoutScalarFieldEnum[] | PayoutScalarFieldEnum
    having?: PayoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayoutCountAggregateInputType | true
    _avg?: PayoutAvgAggregateInputType
    _sum?: PayoutSumAggregateInputType
    _min?: PayoutMinAggregateInputType
    _max?: PayoutMaxAggregateInputType
  }

  export type PayoutGroupByOutputType = {
    id: string
    tenantId: string
    provider: string
    payeeRef: string
    amountCents: bigint
    currency: string
    status: string
    idempotencyKey: string
    externalRef: string | null
    createdByUserId: string | null
    approvedById: string | null
    createdAt: Date
    updatedAt: Date
    _count: PayoutCountAggregateOutputType | null
    _avg: PayoutAvgAggregateOutputType | null
    _sum: PayoutSumAggregateOutputType | null
    _min: PayoutMinAggregateOutputType | null
    _max: PayoutMaxAggregateOutputType | null
  }

  type GetPayoutGroupByPayload<T extends PayoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayoutGroupByOutputType[P]>
            : GetScalarType<T[P], PayoutGroupByOutputType[P]>
        }
      >
    >


  export type PayoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    payeeRef?: boolean
    amountCents?: boolean
    currency?: boolean
    status?: boolean
    idempotencyKey?: boolean
    externalRef?: boolean
    createdByUserId?: boolean
    approvedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    payeeRef?: boolean
    amountCents?: boolean
    currency?: boolean
    status?: boolean
    idempotencyKey?: boolean
    externalRef?: boolean
    createdByUserId?: boolean
    approvedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    payeeRef?: boolean
    amountCents?: boolean
    currency?: boolean
    status?: boolean
    idempotencyKey?: boolean
    externalRef?: boolean
    createdByUserId?: boolean
    approvedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectScalar = {
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    payeeRef?: boolean
    amountCents?: boolean
    currency?: boolean
    status?: boolean
    idempotencyKey?: boolean
    externalRef?: boolean
    createdByUserId?: boolean
    approvedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PayoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "provider" | "payeeRef" | "amountCents" | "currency" | "status" | "idempotencyKey" | "externalRef" | "createdByUserId" | "approvedById" | "createdAt" | "updatedAt", ExtArgs["result"]["payout"]>
  export type PayoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type PayoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type PayoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $PayoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payout"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      provider: string
      payeeRef: string
      amountCents: bigint
      currency: string
      status: string
      idempotencyKey: string
      externalRef: string | null
      createdByUserId: string | null
      approvedById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payout"]>
    composites: {}
  }

  type PayoutGetPayload<S extends boolean | null | undefined | PayoutDefaultArgs> = $Result.GetResult<Prisma.$PayoutPayload, S>

  type PayoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayoutCountAggregateInputType | true
    }

  export interface PayoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payout'], meta: { name: 'Payout' } }
    /**
     * Find zero or one Payout that matches the filter.
     * @param {PayoutFindUniqueArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoutFindUniqueArgs>(args: SelectSubset<T, PayoutFindUniqueArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayoutFindUniqueOrThrowArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoutFindUniqueOrThrowArgs>(args: SelectSubset<T, PayoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindFirstArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoutFindFirstArgs>(args?: SelectSubset<T, PayoutFindFirstArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindFirstOrThrowArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoutFindFirstOrThrowArgs>(args?: SelectSubset<T, PayoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payouts
     * const payouts = await prisma.payout.findMany()
     * 
     * // Get first 10 Payouts
     * const payouts = await prisma.payout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payoutWithIdOnly = await prisma.payout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayoutFindManyArgs>(args?: SelectSubset<T, PayoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payout.
     * @param {PayoutCreateArgs} args - Arguments to create a Payout.
     * @example
     * // Create one Payout
     * const Payout = await prisma.payout.create({
     *   data: {
     *     // ... data to create a Payout
     *   }
     * })
     * 
     */
    create<T extends PayoutCreateArgs>(args: SelectSubset<T, PayoutCreateArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payouts.
     * @param {PayoutCreateManyArgs} args - Arguments to create many Payouts.
     * @example
     * // Create many Payouts
     * const payout = await prisma.payout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayoutCreateManyArgs>(args?: SelectSubset<T, PayoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payouts and returns the data saved in the database.
     * @param {PayoutCreateManyAndReturnArgs} args - Arguments to create many Payouts.
     * @example
     * // Create many Payouts
     * const payout = await prisma.payout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payouts and only return the `id`
     * const payoutWithIdOnly = await prisma.payout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayoutCreateManyAndReturnArgs>(args?: SelectSubset<T, PayoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payout.
     * @param {PayoutDeleteArgs} args - Arguments to delete one Payout.
     * @example
     * // Delete one Payout
     * const Payout = await prisma.payout.delete({
     *   where: {
     *     // ... filter to delete one Payout
     *   }
     * })
     * 
     */
    delete<T extends PayoutDeleteArgs>(args: SelectSubset<T, PayoutDeleteArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payout.
     * @param {PayoutUpdateArgs} args - Arguments to update one Payout.
     * @example
     * // Update one Payout
     * const payout = await prisma.payout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayoutUpdateArgs>(args: SelectSubset<T, PayoutUpdateArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payouts.
     * @param {PayoutDeleteManyArgs} args - Arguments to filter Payouts to delete.
     * @example
     * // Delete a few Payouts
     * const { count } = await prisma.payout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayoutDeleteManyArgs>(args?: SelectSubset<T, PayoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payouts
     * const payout = await prisma.payout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayoutUpdateManyArgs>(args: SelectSubset<T, PayoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payouts and returns the data updated in the database.
     * @param {PayoutUpdateManyAndReturnArgs} args - Arguments to update many Payouts.
     * @example
     * // Update many Payouts
     * const payout = await prisma.payout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payouts and only return the `id`
     * const payoutWithIdOnly = await prisma.payout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PayoutUpdateManyAndReturnArgs>(args: SelectSubset<T, PayoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payout.
     * @param {PayoutUpsertArgs} args - Arguments to update or create a Payout.
     * @example
     * // Update or create a Payout
     * const payout = await prisma.payout.upsert({
     *   create: {
     *     // ... data to create a Payout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payout we want to update
     *   }
     * })
     */
    upsert<T extends PayoutUpsertArgs>(args: SelectSubset<T, PayoutUpsertArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutCountArgs} args - Arguments to filter Payouts to count.
     * @example
     * // Count the number of Payouts
     * const count = await prisma.payout.count({
     *   where: {
     *     // ... the filter for the Payouts we want to count
     *   }
     * })
    **/
    count<T extends PayoutCountArgs>(
      args?: Subset<T, PayoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PayoutAggregateArgs>(args: Subset<T, PayoutAggregateArgs>): Prisma.PrismaPromise<GetPayoutAggregateType<T>>

    /**
     * Group by Payout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PayoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayoutGroupByArgs['orderBy'] }
        : { orderBy?: PayoutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PayoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payout model
   */
  readonly fields: PayoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payout model
   */
  interface PayoutFieldRefs {
    readonly id: FieldRef<"Payout", 'String'>
    readonly tenantId: FieldRef<"Payout", 'String'>
    readonly provider: FieldRef<"Payout", 'String'>
    readonly payeeRef: FieldRef<"Payout", 'String'>
    readonly amountCents: FieldRef<"Payout", 'BigInt'>
    readonly currency: FieldRef<"Payout", 'String'>
    readonly status: FieldRef<"Payout", 'String'>
    readonly idempotencyKey: FieldRef<"Payout", 'String'>
    readonly externalRef: FieldRef<"Payout", 'String'>
    readonly createdByUserId: FieldRef<"Payout", 'String'>
    readonly approvedById: FieldRef<"Payout", 'String'>
    readonly createdAt: FieldRef<"Payout", 'DateTime'>
    readonly updatedAt: FieldRef<"Payout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payout findUnique
   */
  export type PayoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout findUniqueOrThrow
   */
  export type PayoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout findFirst
   */
  export type PayoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout findFirstOrThrow
   */
  export type PayoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout findMany
   */
  export type PayoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payouts to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout create
   */
  export type PayoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The data needed to create a Payout.
     */
    data: XOR<PayoutCreateInput, PayoutUncheckedCreateInput>
  }

  /**
   * Payout createMany
   */
  export type PayoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payouts.
     */
    data: PayoutCreateManyInput | PayoutCreateManyInput[]
  }

  /**
   * Payout createManyAndReturn
   */
  export type PayoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * The data used to create many Payouts.
     */
    data: PayoutCreateManyInput | PayoutCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payout update
   */
  export type PayoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The data needed to update a Payout.
     */
    data: XOR<PayoutUpdateInput, PayoutUncheckedUpdateInput>
    /**
     * Choose, which Payout to update.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout updateMany
   */
  export type PayoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payouts.
     */
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyInput>
    /**
     * Filter which Payouts to update
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to update.
     */
    limit?: number
  }

  /**
   * Payout updateManyAndReturn
   */
  export type PayoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * The data used to update Payouts.
     */
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyInput>
    /**
     * Filter which Payouts to update
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payout upsert
   */
  export type PayoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The filter to search for the Payout to update in case it exists.
     */
    where: PayoutWhereUniqueInput
    /**
     * In case the Payout found by the `where` argument doesn't exist, create a new Payout with this data.
     */
    create: XOR<PayoutCreateInput, PayoutUncheckedCreateInput>
    /**
     * In case the Payout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayoutUpdateInput, PayoutUncheckedUpdateInput>
  }

  /**
   * Payout delete
   */
  export type PayoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter which Payout to delete.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout deleteMany
   */
  export type PayoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payouts to delete
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to delete.
     */
    limit?: number
  }

  /**
   * Payout without action
   */
  export type PayoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
  }


  /**
   * Model LedgerEntry
   */

  export type AggregateLedgerEntry = {
    _count: LedgerEntryCountAggregateOutputType | null
    _avg: LedgerEntryAvgAggregateOutputType | null
    _sum: LedgerEntrySumAggregateOutputType | null
    _min: LedgerEntryMinAggregateOutputType | null
    _max: LedgerEntryMaxAggregateOutputType | null
  }

  export type LedgerEntryAvgAggregateOutputType = {
    debitCents: number | null
    creditCents: number | null
  }

  export type LedgerEntrySumAggregateOutputType = {
    debitCents: bigint | null
    creditCents: bigint | null
  }

  export type LedgerEntryMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    account: string | null
    debitCents: bigint | null
    creditCents: bigint | null
    refType: string | null
    refId: string | null
    createdAt: Date | null
  }

  export type LedgerEntryMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    account: string | null
    debitCents: bigint | null
    creditCents: bigint | null
    refType: string | null
    refId: string | null
    createdAt: Date | null
  }

  export type LedgerEntryCountAggregateOutputType = {
    id: number
    tenantId: number
    account: number
    debitCents: number
    creditCents: number
    refType: number
    refId: number
    createdAt: number
    _all: number
  }


  export type LedgerEntryAvgAggregateInputType = {
    debitCents?: true
    creditCents?: true
  }

  export type LedgerEntrySumAggregateInputType = {
    debitCents?: true
    creditCents?: true
  }

  export type LedgerEntryMinAggregateInputType = {
    id?: true
    tenantId?: true
    account?: true
    debitCents?: true
    creditCents?: true
    refType?: true
    refId?: true
    createdAt?: true
  }

  export type LedgerEntryMaxAggregateInputType = {
    id?: true
    tenantId?: true
    account?: true
    debitCents?: true
    creditCents?: true
    refType?: true
    refId?: true
    createdAt?: true
  }

  export type LedgerEntryCountAggregateInputType = {
    id?: true
    tenantId?: true
    account?: true
    debitCents?: true
    creditCents?: true
    refType?: true
    refId?: true
    createdAt?: true
    _all?: true
  }

  export type LedgerEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerEntry to aggregate.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LedgerEntries
    **/
    _count?: true | LedgerEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LedgerEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LedgerEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LedgerEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LedgerEntryMaxAggregateInputType
  }

  export type GetLedgerEntryAggregateType<T extends LedgerEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateLedgerEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLedgerEntry[P]>
      : GetScalarType<T[P], AggregateLedgerEntry[P]>
  }




  export type LedgerEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerEntryWhereInput
    orderBy?: LedgerEntryOrderByWithAggregationInput | LedgerEntryOrderByWithAggregationInput[]
    by: LedgerEntryScalarFieldEnum[] | LedgerEntryScalarFieldEnum
    having?: LedgerEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LedgerEntryCountAggregateInputType | true
    _avg?: LedgerEntryAvgAggregateInputType
    _sum?: LedgerEntrySumAggregateInputType
    _min?: LedgerEntryMinAggregateInputType
    _max?: LedgerEntryMaxAggregateInputType
  }

  export type LedgerEntryGroupByOutputType = {
    id: string
    tenantId: string
    account: string
    debitCents: bigint
    creditCents: bigint
    refType: string | null
    refId: string | null
    createdAt: Date
    _count: LedgerEntryCountAggregateOutputType | null
    _avg: LedgerEntryAvgAggregateOutputType | null
    _sum: LedgerEntrySumAggregateOutputType | null
    _min: LedgerEntryMinAggregateOutputType | null
    _max: LedgerEntryMaxAggregateOutputType | null
  }

  type GetLedgerEntryGroupByPayload<T extends LedgerEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LedgerEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LedgerEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LedgerEntryGroupByOutputType[P]>
            : GetScalarType<T[P], LedgerEntryGroupByOutputType[P]>
        }
      >
    >


  export type LedgerEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    account?: boolean
    debitCents?: boolean
    creditCents?: boolean
    refType?: boolean
    refId?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledgerEntry"]>

  export type LedgerEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    account?: boolean
    debitCents?: boolean
    creditCents?: boolean
    refType?: boolean
    refId?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledgerEntry"]>

  export type LedgerEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    account?: boolean
    debitCents?: boolean
    creditCents?: boolean
    refType?: boolean
    refId?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledgerEntry"]>

  export type LedgerEntrySelectScalar = {
    id?: boolean
    tenantId?: boolean
    account?: boolean
    debitCents?: boolean
    creditCents?: boolean
    refType?: boolean
    refId?: boolean
    createdAt?: boolean
  }

  export type LedgerEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "account" | "debitCents" | "creditCents" | "refType" | "refId" | "createdAt", ExtArgs["result"]["ledgerEntry"]>
  export type LedgerEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type LedgerEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type LedgerEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $LedgerEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LedgerEntry"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      account: string
      debitCents: bigint
      creditCents: bigint
      refType: string | null
      refId: string | null
      createdAt: Date
    }, ExtArgs["result"]["ledgerEntry"]>
    composites: {}
  }

  type LedgerEntryGetPayload<S extends boolean | null | undefined | LedgerEntryDefaultArgs> = $Result.GetResult<Prisma.$LedgerEntryPayload, S>

  type LedgerEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LedgerEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LedgerEntryCountAggregateInputType | true
    }

  export interface LedgerEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LedgerEntry'], meta: { name: 'LedgerEntry' } }
    /**
     * Find zero or one LedgerEntry that matches the filter.
     * @param {LedgerEntryFindUniqueArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LedgerEntryFindUniqueArgs>(args: SelectSubset<T, LedgerEntryFindUniqueArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LedgerEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LedgerEntryFindUniqueOrThrowArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LedgerEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, LedgerEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LedgerEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindFirstArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LedgerEntryFindFirstArgs>(args?: SelectSubset<T, LedgerEntryFindFirstArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LedgerEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindFirstOrThrowArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LedgerEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, LedgerEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LedgerEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LedgerEntries
     * const ledgerEntries = await prisma.ledgerEntry.findMany()
     * 
     * // Get first 10 LedgerEntries
     * const ledgerEntries = await prisma.ledgerEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LedgerEntryFindManyArgs>(args?: SelectSubset<T, LedgerEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LedgerEntry.
     * @param {LedgerEntryCreateArgs} args - Arguments to create a LedgerEntry.
     * @example
     * // Create one LedgerEntry
     * const LedgerEntry = await prisma.ledgerEntry.create({
     *   data: {
     *     // ... data to create a LedgerEntry
     *   }
     * })
     * 
     */
    create<T extends LedgerEntryCreateArgs>(args: SelectSubset<T, LedgerEntryCreateArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LedgerEntries.
     * @param {LedgerEntryCreateManyArgs} args - Arguments to create many LedgerEntries.
     * @example
     * // Create many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LedgerEntryCreateManyArgs>(args?: SelectSubset<T, LedgerEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LedgerEntries and returns the data saved in the database.
     * @param {LedgerEntryCreateManyAndReturnArgs} args - Arguments to create many LedgerEntries.
     * @example
     * // Create many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LedgerEntries and only return the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LedgerEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, LedgerEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LedgerEntry.
     * @param {LedgerEntryDeleteArgs} args - Arguments to delete one LedgerEntry.
     * @example
     * // Delete one LedgerEntry
     * const LedgerEntry = await prisma.ledgerEntry.delete({
     *   where: {
     *     // ... filter to delete one LedgerEntry
     *   }
     * })
     * 
     */
    delete<T extends LedgerEntryDeleteArgs>(args: SelectSubset<T, LedgerEntryDeleteArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LedgerEntry.
     * @param {LedgerEntryUpdateArgs} args - Arguments to update one LedgerEntry.
     * @example
     * // Update one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LedgerEntryUpdateArgs>(args: SelectSubset<T, LedgerEntryUpdateArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LedgerEntries.
     * @param {LedgerEntryDeleteManyArgs} args - Arguments to filter LedgerEntries to delete.
     * @example
     * // Delete a few LedgerEntries
     * const { count } = await prisma.ledgerEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LedgerEntryDeleteManyArgs>(args?: SelectSubset<T, LedgerEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LedgerEntryUpdateManyArgs>(args: SelectSubset<T, LedgerEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerEntries and returns the data updated in the database.
     * @param {LedgerEntryUpdateManyAndReturnArgs} args - Arguments to update many LedgerEntries.
     * @example
     * // Update many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LedgerEntries and only return the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LedgerEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, LedgerEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LedgerEntry.
     * @param {LedgerEntryUpsertArgs} args - Arguments to update or create a LedgerEntry.
     * @example
     * // Update or create a LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.upsert({
     *   create: {
     *     // ... data to create a LedgerEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LedgerEntry we want to update
     *   }
     * })
     */
    upsert<T extends LedgerEntryUpsertArgs>(args: SelectSubset<T, LedgerEntryUpsertArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryCountArgs} args - Arguments to filter LedgerEntries to count.
     * @example
     * // Count the number of LedgerEntries
     * const count = await prisma.ledgerEntry.count({
     *   where: {
     *     // ... the filter for the LedgerEntries we want to count
     *   }
     * })
    **/
    count<T extends LedgerEntryCountArgs>(
      args?: Subset<T, LedgerEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LedgerEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LedgerEntryAggregateArgs>(args: Subset<T, LedgerEntryAggregateArgs>): Prisma.PrismaPromise<GetLedgerEntryAggregateType<T>>

    /**
     * Group by LedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LedgerEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LedgerEntryGroupByArgs['orderBy'] }
        : { orderBy?: LedgerEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LedgerEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLedgerEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LedgerEntry model
   */
  readonly fields: LedgerEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LedgerEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LedgerEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LedgerEntry model
   */
  interface LedgerEntryFieldRefs {
    readonly id: FieldRef<"LedgerEntry", 'String'>
    readonly tenantId: FieldRef<"LedgerEntry", 'String'>
    readonly account: FieldRef<"LedgerEntry", 'String'>
    readonly debitCents: FieldRef<"LedgerEntry", 'BigInt'>
    readonly creditCents: FieldRef<"LedgerEntry", 'BigInt'>
    readonly refType: FieldRef<"LedgerEntry", 'String'>
    readonly refId: FieldRef<"LedgerEntry", 'String'>
    readonly createdAt: FieldRef<"LedgerEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LedgerEntry findUnique
   */
  export type LedgerEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry findUniqueOrThrow
   */
  export type LedgerEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry findFirst
   */
  export type LedgerEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerEntries.
     */
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * LedgerEntry findFirstOrThrow
   */
  export type LedgerEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerEntries.
     */
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * LedgerEntry findMany
   */
  export type LedgerEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which LedgerEntries to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * LedgerEntry create
   */
  export type LedgerEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a LedgerEntry.
     */
    data: XOR<LedgerEntryCreateInput, LedgerEntryUncheckedCreateInput>
  }

  /**
   * LedgerEntry createMany
   */
  export type LedgerEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LedgerEntries.
     */
    data: LedgerEntryCreateManyInput | LedgerEntryCreateManyInput[]
  }

  /**
   * LedgerEntry createManyAndReturn
   */
  export type LedgerEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * The data used to create many LedgerEntries.
     */
    data: LedgerEntryCreateManyInput | LedgerEntryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LedgerEntry update
   */
  export type LedgerEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a LedgerEntry.
     */
    data: XOR<LedgerEntryUpdateInput, LedgerEntryUncheckedUpdateInput>
    /**
     * Choose, which LedgerEntry to update.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry updateMany
   */
  export type LedgerEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LedgerEntries.
     */
    data: XOR<LedgerEntryUpdateManyMutationInput, LedgerEntryUncheckedUpdateManyInput>
    /**
     * Filter which LedgerEntries to update
     */
    where?: LedgerEntryWhereInput
    /**
     * Limit how many LedgerEntries to update.
     */
    limit?: number
  }

  /**
   * LedgerEntry updateManyAndReturn
   */
  export type LedgerEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * The data used to update LedgerEntries.
     */
    data: XOR<LedgerEntryUpdateManyMutationInput, LedgerEntryUncheckedUpdateManyInput>
    /**
     * Filter which LedgerEntries to update
     */
    where?: LedgerEntryWhereInput
    /**
     * Limit how many LedgerEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LedgerEntry upsert
   */
  export type LedgerEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the LedgerEntry to update in case it exists.
     */
    where: LedgerEntryWhereUniqueInput
    /**
     * In case the LedgerEntry found by the `where` argument doesn't exist, create a new LedgerEntry with this data.
     */
    create: XOR<LedgerEntryCreateInput, LedgerEntryUncheckedCreateInput>
    /**
     * In case the LedgerEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LedgerEntryUpdateInput, LedgerEntryUncheckedUpdateInput>
  }

  /**
   * LedgerEntry delete
   */
  export type LedgerEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter which LedgerEntry to delete.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry deleteMany
   */
  export type LedgerEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerEntries to delete
     */
    where?: LedgerEntryWhereInput
    /**
     * Limit how many LedgerEntries to delete.
     */
    limit?: number
  }

  /**
   * LedgerEntry without action
   */
  export type LedgerEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
  }


  /**
   * Model WebhookEvent
   */

  export type AggregateWebhookEvent = {
    _count: WebhookEventCountAggregateOutputType | null
    _min: WebhookEventMinAggregateOutputType | null
    _max: WebhookEventMaxAggregateOutputType | null
  }

  export type WebhookEventMinAggregateOutputType = {
    id: string | null
    provider: string | null
    eventId: string | null
    tenantId: string | null
    signatureValid: boolean | null
    processedAt: Date | null
    receivedAt: Date | null
  }

  export type WebhookEventMaxAggregateOutputType = {
    id: string | null
    provider: string | null
    eventId: string | null
    tenantId: string | null
    signatureValid: boolean | null
    processedAt: Date | null
    receivedAt: Date | null
  }

  export type WebhookEventCountAggregateOutputType = {
    id: number
    provider: number
    eventId: number
    tenantId: number
    payload: number
    signatureValid: number
    processedAt: number
    receivedAt: number
    _all: number
  }


  export type WebhookEventMinAggregateInputType = {
    id?: true
    provider?: true
    eventId?: true
    tenantId?: true
    signatureValid?: true
    processedAt?: true
    receivedAt?: true
  }

  export type WebhookEventMaxAggregateInputType = {
    id?: true
    provider?: true
    eventId?: true
    tenantId?: true
    signatureValid?: true
    processedAt?: true
    receivedAt?: true
  }

  export type WebhookEventCountAggregateInputType = {
    id?: true
    provider?: true
    eventId?: true
    tenantId?: true
    payload?: true
    signatureValid?: true
    processedAt?: true
    receivedAt?: true
    _all?: true
  }

  export type WebhookEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEvent to aggregate.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookEvents
    **/
    _count?: true | WebhookEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookEventMaxAggregateInputType
  }

  export type GetWebhookEventAggregateType<T extends WebhookEventAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookEvent[P]>
      : GetScalarType<T[P], AggregateWebhookEvent[P]>
  }




  export type WebhookEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEventWhereInput
    orderBy?: WebhookEventOrderByWithAggregationInput | WebhookEventOrderByWithAggregationInput[]
    by: WebhookEventScalarFieldEnum[] | WebhookEventScalarFieldEnum
    having?: WebhookEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookEventCountAggregateInputType | true
    _min?: WebhookEventMinAggregateInputType
    _max?: WebhookEventMaxAggregateInputType
  }

  export type WebhookEventGroupByOutputType = {
    id: string
    provider: string
    eventId: string | null
    tenantId: string | null
    payload: JsonValue
    signatureValid: boolean
    processedAt: Date | null
    receivedAt: Date
    _count: WebhookEventCountAggregateOutputType | null
    _min: WebhookEventMinAggregateOutputType | null
    _max: WebhookEventMaxAggregateOutputType | null
  }

  type GetWebhookEventGroupByPayload<T extends WebhookEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
        }
      >
    >


  export type WebhookEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    eventId?: boolean
    tenantId?: boolean
    payload?: boolean
    signatureValid?: boolean
    processedAt?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    eventId?: boolean
    tenantId?: boolean
    payload?: boolean
    signatureValid?: boolean
    processedAt?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    eventId?: boolean
    tenantId?: boolean
    payload?: boolean
    signatureValid?: boolean
    processedAt?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectScalar = {
    id?: boolean
    provider?: boolean
    eventId?: boolean
    tenantId?: boolean
    payload?: boolean
    signatureValid?: boolean
    processedAt?: boolean
    receivedAt?: boolean
  }

  export type WebhookEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "eventId" | "tenantId" | "payload" | "signatureValid" | "processedAt" | "receivedAt", ExtArgs["result"]["webhookEvent"]>

  export type $WebhookEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: string
      eventId: string | null
      tenantId: string | null
      payload: Prisma.JsonValue
      signatureValid: boolean
      processedAt: Date | null
      receivedAt: Date
    }, ExtArgs["result"]["webhookEvent"]>
    composites: {}
  }

  type WebhookEventGetPayload<S extends boolean | null | undefined | WebhookEventDefaultArgs> = $Result.GetResult<Prisma.$WebhookEventPayload, S>

  type WebhookEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookEventCountAggregateInputType | true
    }

  export interface WebhookEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookEvent'], meta: { name: 'WebhookEvent' } }
    /**
     * Find zero or one WebhookEvent that matches the filter.
     * @param {WebhookEventFindUniqueArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookEventFindUniqueArgs>(args: SelectSubset<T, WebhookEventFindUniqueArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookEventFindUniqueOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookEventFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookEventFindFirstArgs>(args?: SelectSubset<T, WebhookEventFindFirstArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookEventFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany()
     * 
     * // Get first 10 WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookEventFindManyArgs>(args?: SelectSubset<T, WebhookEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookEvent.
     * @param {WebhookEventCreateArgs} args - Arguments to create a WebhookEvent.
     * @example
     * // Create one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.create({
     *   data: {
     *     // ... data to create a WebhookEvent
     *   }
     * })
     * 
     */
    create<T extends WebhookEventCreateArgs>(args: SelectSubset<T, WebhookEventCreateArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookEvents.
     * @param {WebhookEventCreateManyArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookEventCreateManyArgs>(args?: SelectSubset<T, WebhookEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookEvents and returns the data saved in the database.
     * @param {WebhookEventCreateManyAndReturnArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookEventCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookEvent.
     * @param {WebhookEventDeleteArgs} args - Arguments to delete one WebhookEvent.
     * @example
     * // Delete one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.delete({
     *   where: {
     *     // ... filter to delete one WebhookEvent
     *   }
     * })
     * 
     */
    delete<T extends WebhookEventDeleteArgs>(args: SelectSubset<T, WebhookEventDeleteArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookEvent.
     * @param {WebhookEventUpdateArgs} args - Arguments to update one WebhookEvent.
     * @example
     * // Update one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookEventUpdateArgs>(args: SelectSubset<T, WebhookEventUpdateArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookEvents.
     * @param {WebhookEventDeleteManyArgs} args - Arguments to filter WebhookEvents to delete.
     * @example
     * // Delete a few WebhookEvents
     * const { count } = await prisma.webhookEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookEventDeleteManyArgs>(args?: SelectSubset<T, WebhookEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookEventUpdateManyArgs>(args: SelectSubset<T, WebhookEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEvents and returns the data updated in the database.
     * @param {WebhookEventUpdateManyAndReturnArgs} args - Arguments to update many WebhookEvents.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookEventUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookEvent.
     * @param {WebhookEventUpsertArgs} args - Arguments to update or create a WebhookEvent.
     * @example
     * // Update or create a WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.upsert({
     *   create: {
     *     // ... data to create a WebhookEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookEvent we want to update
     *   }
     * })
     */
    upsert<T extends WebhookEventUpsertArgs>(args: SelectSubset<T, WebhookEventUpsertArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventCountArgs} args - Arguments to filter WebhookEvents to count.
     * @example
     * // Count the number of WebhookEvents
     * const count = await prisma.webhookEvent.count({
     *   where: {
     *     // ... the filter for the WebhookEvents we want to count
     *   }
     * })
    **/
    count<T extends WebhookEventCountArgs>(
      args?: Subset<T, WebhookEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookEventAggregateArgs>(args: Subset<T, WebhookEventAggregateArgs>): Prisma.PrismaPromise<GetWebhookEventAggregateType<T>>

    /**
     * Group by WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookEventGroupByArgs['orderBy'] }
        : { orderBy?: WebhookEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookEvent model
   */
  readonly fields: WebhookEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookEvent model
   */
  interface WebhookEventFieldRefs {
    readonly id: FieldRef<"WebhookEvent", 'String'>
    readonly provider: FieldRef<"WebhookEvent", 'String'>
    readonly eventId: FieldRef<"WebhookEvent", 'String'>
    readonly tenantId: FieldRef<"WebhookEvent", 'String'>
    readonly payload: FieldRef<"WebhookEvent", 'Json'>
    readonly signatureValid: FieldRef<"WebhookEvent", 'Boolean'>
    readonly processedAt: FieldRef<"WebhookEvent", 'DateTime'>
    readonly receivedAt: FieldRef<"WebhookEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookEvent findUnique
   */
  export type WebhookEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent findUniqueOrThrow
   */
  export type WebhookEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent findFirst
   */
  export type WebhookEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent findFirstOrThrow
   */
  export type WebhookEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent findMany
   */
  export type WebhookEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvents to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent create
   */
  export type WebhookEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data needed to create a WebhookEvent.
     */
    data: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>
  }

  /**
   * WebhookEvent createMany
   */
  export type WebhookEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[]
  }

  /**
   * WebhookEvent createManyAndReturn
   */
  export type WebhookEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[]
  }

  /**
   * WebhookEvent update
   */
  export type WebhookEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data needed to update a WebhookEvent.
     */
    data: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>
    /**
     * Choose, which WebhookEvent to update.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent updateMany
   */
  export type WebhookEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number
  }

  /**
   * WebhookEvent updateManyAndReturn
   */
  export type WebhookEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number
  }

  /**
   * WebhookEvent upsert
   */
  export type WebhookEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The filter to search for the WebhookEvent to update in case it exists.
     */
    where: WebhookEventWhereUniqueInput
    /**
     * In case the WebhookEvent found by the `where` argument doesn't exist, create a new WebhookEvent with this data.
     */
    create: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>
    /**
     * In case the WebhookEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>
  }

  /**
   * WebhookEvent delete
   */
  export type WebhookEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter which WebhookEvent to delete.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent deleteMany
   */
  export type WebhookEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEvents to delete
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to delete.
     */
    limit?: number
  }

  /**
   * WebhookEvent without action
   */
  export type WebhookEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    apiKeyId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    metadata: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    apiKeyId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    metadata: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    tenantId: number
    userId: number
    apiKeyId: number
    action: number
    entity: number
    entityId: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    apiKeyId?: true
    action?: true
    entity?: true
    entityId?: true
    metadata?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    apiKeyId?: true
    action?: true
    entity?: true
    entityId?: true
    metadata?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    apiKeyId?: true
    action?: true
    entity?: true
    entityId?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    tenantId: string
    userId: string | null
    apiKeyId: string | null
    action: string
    entity: string
    entityId: string
    metadata: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    apiKeyId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    apiKeyId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    apiKeyId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    apiKeyId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "userId" | "apiKeyId" | "action" | "entity" | "entityId" | "metadata" | "createdAt", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      userId: string | null
      apiKeyId: string | null
      action: string
      entity: string
      entityId: string
      metadata: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly tenantId: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly apiKeyId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model SubscriptionCycle
   */

  export type AggregateSubscriptionCycle = {
    _count: SubscriptionCycleCountAggregateOutputType | null
    _avg: SubscriptionCycleAvgAggregateOutputType | null
    _sum: SubscriptionCycleSumAggregateOutputType | null
    _min: SubscriptionCycleMinAggregateOutputType | null
    _max: SubscriptionCycleMaxAggregateOutputType | null
  }

  export type SubscriptionCycleAvgAggregateOutputType = {
    gmvSnapshot: number | null
    amountCents: number | null
  }

  export type SubscriptionCycleSumAggregateOutputType = {
    gmvSnapshot: bigint | null
    amountCents: bigint | null
  }

  export type SubscriptionCycleMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    gmvSnapshot: bigint | null
    tierApplied: string | null
    amountCents: bigint | null
    invoicedAt: Date | null
    createdAt: Date | null
  }

  export type SubscriptionCycleMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    gmvSnapshot: bigint | null
    tierApplied: string | null
    amountCents: bigint | null
    invoicedAt: Date | null
    createdAt: Date | null
  }

  export type SubscriptionCycleCountAggregateOutputType = {
    id: number
    tenantId: number
    periodStart: number
    periodEnd: number
    gmvSnapshot: number
    tierApplied: number
    amountCents: number
    invoicedAt: number
    createdAt: number
    _all: number
  }


  export type SubscriptionCycleAvgAggregateInputType = {
    gmvSnapshot?: true
    amountCents?: true
  }

  export type SubscriptionCycleSumAggregateInputType = {
    gmvSnapshot?: true
    amountCents?: true
  }

  export type SubscriptionCycleMinAggregateInputType = {
    id?: true
    tenantId?: true
    periodStart?: true
    periodEnd?: true
    gmvSnapshot?: true
    tierApplied?: true
    amountCents?: true
    invoicedAt?: true
    createdAt?: true
  }

  export type SubscriptionCycleMaxAggregateInputType = {
    id?: true
    tenantId?: true
    periodStart?: true
    periodEnd?: true
    gmvSnapshot?: true
    tierApplied?: true
    amountCents?: true
    invoicedAt?: true
    createdAt?: true
  }

  export type SubscriptionCycleCountAggregateInputType = {
    id?: true
    tenantId?: true
    periodStart?: true
    periodEnd?: true
    gmvSnapshot?: true
    tierApplied?: true
    amountCents?: true
    invoicedAt?: true
    createdAt?: true
    _all?: true
  }

  export type SubscriptionCycleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionCycle to aggregate.
     */
    where?: SubscriptionCycleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionCycles to fetch.
     */
    orderBy?: SubscriptionCycleOrderByWithRelationInput | SubscriptionCycleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionCycleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionCycles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionCycles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubscriptionCycles
    **/
    _count?: true | SubscriptionCycleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionCycleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionCycleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionCycleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionCycleMaxAggregateInputType
  }

  export type GetSubscriptionCycleAggregateType<T extends SubscriptionCycleAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptionCycle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptionCycle[P]>
      : GetScalarType<T[P], AggregateSubscriptionCycle[P]>
  }




  export type SubscriptionCycleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionCycleWhereInput
    orderBy?: SubscriptionCycleOrderByWithAggregationInput | SubscriptionCycleOrderByWithAggregationInput[]
    by: SubscriptionCycleScalarFieldEnum[] | SubscriptionCycleScalarFieldEnum
    having?: SubscriptionCycleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCycleCountAggregateInputType | true
    _avg?: SubscriptionCycleAvgAggregateInputType
    _sum?: SubscriptionCycleSumAggregateInputType
    _min?: SubscriptionCycleMinAggregateInputType
    _max?: SubscriptionCycleMaxAggregateInputType
  }

  export type SubscriptionCycleGroupByOutputType = {
    id: string
    tenantId: string
    periodStart: Date
    periodEnd: Date
    gmvSnapshot: bigint
    tierApplied: string
    amountCents: bigint
    invoicedAt: Date | null
    createdAt: Date
    _count: SubscriptionCycleCountAggregateOutputType | null
    _avg: SubscriptionCycleAvgAggregateOutputType | null
    _sum: SubscriptionCycleSumAggregateOutputType | null
    _min: SubscriptionCycleMinAggregateOutputType | null
    _max: SubscriptionCycleMaxAggregateOutputType | null
  }

  type GetSubscriptionCycleGroupByPayload<T extends SubscriptionCycleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionCycleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionCycleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionCycleGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionCycleGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionCycleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    gmvSnapshot?: boolean
    tierApplied?: boolean
    amountCents?: boolean
    invoicedAt?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionCycle"]>

  export type SubscriptionCycleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    gmvSnapshot?: boolean
    tierApplied?: boolean
    amountCents?: boolean
    invoicedAt?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionCycle"]>

  export type SubscriptionCycleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    gmvSnapshot?: boolean
    tierApplied?: boolean
    amountCents?: boolean
    invoicedAt?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionCycle"]>

  export type SubscriptionCycleSelectScalar = {
    id?: boolean
    tenantId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    gmvSnapshot?: boolean
    tierApplied?: boolean
    amountCents?: boolean
    invoicedAt?: boolean
    createdAt?: boolean
  }

  export type SubscriptionCycleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "periodStart" | "periodEnd" | "gmvSnapshot" | "tierApplied" | "amountCents" | "invoicedAt" | "createdAt", ExtArgs["result"]["subscriptionCycle"]>
  export type SubscriptionCycleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type SubscriptionCycleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type SubscriptionCycleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $SubscriptionCyclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubscriptionCycle"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      periodStart: Date
      periodEnd: Date
      gmvSnapshot: bigint
      tierApplied: string
      amountCents: bigint
      invoicedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["subscriptionCycle"]>
    composites: {}
  }

  type SubscriptionCycleGetPayload<S extends boolean | null | undefined | SubscriptionCycleDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionCyclePayload, S>

  type SubscriptionCycleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionCycleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCycleCountAggregateInputType | true
    }

  export interface SubscriptionCycleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubscriptionCycle'], meta: { name: 'SubscriptionCycle' } }
    /**
     * Find zero or one SubscriptionCycle that matches the filter.
     * @param {SubscriptionCycleFindUniqueArgs} args - Arguments to find a SubscriptionCycle
     * @example
     * // Get one SubscriptionCycle
     * const subscriptionCycle = await prisma.subscriptionCycle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionCycleFindUniqueArgs>(args: SelectSubset<T, SubscriptionCycleFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionCycleClient<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubscriptionCycle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionCycleFindUniqueOrThrowArgs} args - Arguments to find a SubscriptionCycle
     * @example
     * // Get one SubscriptionCycle
     * const subscriptionCycle = await prisma.subscriptionCycle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionCycleFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionCycleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionCycleClient<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriptionCycle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCycleFindFirstArgs} args - Arguments to find a SubscriptionCycle
     * @example
     * // Get one SubscriptionCycle
     * const subscriptionCycle = await prisma.subscriptionCycle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionCycleFindFirstArgs>(args?: SelectSubset<T, SubscriptionCycleFindFirstArgs<ExtArgs>>): Prisma__SubscriptionCycleClient<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriptionCycle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCycleFindFirstOrThrowArgs} args - Arguments to find a SubscriptionCycle
     * @example
     * // Get one SubscriptionCycle
     * const subscriptionCycle = await prisma.subscriptionCycle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionCycleFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionCycleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionCycleClient<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubscriptionCycles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCycleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubscriptionCycles
     * const subscriptionCycles = await prisma.subscriptionCycle.findMany()
     * 
     * // Get first 10 SubscriptionCycles
     * const subscriptionCycles = await prisma.subscriptionCycle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionCycleWithIdOnly = await prisma.subscriptionCycle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionCycleFindManyArgs>(args?: SelectSubset<T, SubscriptionCycleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubscriptionCycle.
     * @param {SubscriptionCycleCreateArgs} args - Arguments to create a SubscriptionCycle.
     * @example
     * // Create one SubscriptionCycle
     * const SubscriptionCycle = await prisma.subscriptionCycle.create({
     *   data: {
     *     // ... data to create a SubscriptionCycle
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCycleCreateArgs>(args: SelectSubset<T, SubscriptionCycleCreateArgs<ExtArgs>>): Prisma__SubscriptionCycleClient<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubscriptionCycles.
     * @param {SubscriptionCycleCreateManyArgs} args - Arguments to create many SubscriptionCycles.
     * @example
     * // Create many SubscriptionCycles
     * const subscriptionCycle = await prisma.subscriptionCycle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCycleCreateManyArgs>(args?: SelectSubset<T, SubscriptionCycleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubscriptionCycles and returns the data saved in the database.
     * @param {SubscriptionCycleCreateManyAndReturnArgs} args - Arguments to create many SubscriptionCycles.
     * @example
     * // Create many SubscriptionCycles
     * const subscriptionCycle = await prisma.subscriptionCycle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubscriptionCycles and only return the `id`
     * const subscriptionCycleWithIdOnly = await prisma.subscriptionCycle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCycleCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCycleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubscriptionCycle.
     * @param {SubscriptionCycleDeleteArgs} args - Arguments to delete one SubscriptionCycle.
     * @example
     * // Delete one SubscriptionCycle
     * const SubscriptionCycle = await prisma.subscriptionCycle.delete({
     *   where: {
     *     // ... filter to delete one SubscriptionCycle
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionCycleDeleteArgs>(args: SelectSubset<T, SubscriptionCycleDeleteArgs<ExtArgs>>): Prisma__SubscriptionCycleClient<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubscriptionCycle.
     * @param {SubscriptionCycleUpdateArgs} args - Arguments to update one SubscriptionCycle.
     * @example
     * // Update one SubscriptionCycle
     * const subscriptionCycle = await prisma.subscriptionCycle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionCycleUpdateArgs>(args: SelectSubset<T, SubscriptionCycleUpdateArgs<ExtArgs>>): Prisma__SubscriptionCycleClient<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubscriptionCycles.
     * @param {SubscriptionCycleDeleteManyArgs} args - Arguments to filter SubscriptionCycles to delete.
     * @example
     * // Delete a few SubscriptionCycles
     * const { count } = await prisma.subscriptionCycle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionCycleDeleteManyArgs>(args?: SelectSubset<T, SubscriptionCycleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionCycles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCycleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubscriptionCycles
     * const subscriptionCycle = await prisma.subscriptionCycle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionCycleUpdateManyArgs>(args: SelectSubset<T, SubscriptionCycleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionCycles and returns the data updated in the database.
     * @param {SubscriptionCycleUpdateManyAndReturnArgs} args - Arguments to update many SubscriptionCycles.
     * @example
     * // Update many SubscriptionCycles
     * const subscriptionCycle = await prisma.subscriptionCycle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubscriptionCycles and only return the `id`
     * const subscriptionCycleWithIdOnly = await prisma.subscriptionCycle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionCycleUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionCycleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubscriptionCycle.
     * @param {SubscriptionCycleUpsertArgs} args - Arguments to update or create a SubscriptionCycle.
     * @example
     * // Update or create a SubscriptionCycle
     * const subscriptionCycle = await prisma.subscriptionCycle.upsert({
     *   create: {
     *     // ... data to create a SubscriptionCycle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubscriptionCycle we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionCycleUpsertArgs>(args: SelectSubset<T, SubscriptionCycleUpsertArgs<ExtArgs>>): Prisma__SubscriptionCycleClient<$Result.GetResult<Prisma.$SubscriptionCyclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubscriptionCycles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCycleCountArgs} args - Arguments to filter SubscriptionCycles to count.
     * @example
     * // Count the number of SubscriptionCycles
     * const count = await prisma.subscriptionCycle.count({
     *   where: {
     *     // ... the filter for the SubscriptionCycles we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCycleCountArgs>(
      args?: Subset<T, SubscriptionCycleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCycleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubscriptionCycle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCycleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionCycleAggregateArgs>(args: Subset<T, SubscriptionCycleAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionCycleAggregateType<T>>

    /**
     * Group by SubscriptionCycle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCycleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionCycleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionCycleGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionCycleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionCycleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionCycleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubscriptionCycle model
   */
  readonly fields: SubscriptionCycleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubscriptionCycle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionCycleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubscriptionCycle model
   */
  interface SubscriptionCycleFieldRefs {
    readonly id: FieldRef<"SubscriptionCycle", 'String'>
    readonly tenantId: FieldRef<"SubscriptionCycle", 'String'>
    readonly periodStart: FieldRef<"SubscriptionCycle", 'DateTime'>
    readonly periodEnd: FieldRef<"SubscriptionCycle", 'DateTime'>
    readonly gmvSnapshot: FieldRef<"SubscriptionCycle", 'BigInt'>
    readonly tierApplied: FieldRef<"SubscriptionCycle", 'String'>
    readonly amountCents: FieldRef<"SubscriptionCycle", 'BigInt'>
    readonly invoicedAt: FieldRef<"SubscriptionCycle", 'DateTime'>
    readonly createdAt: FieldRef<"SubscriptionCycle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubscriptionCycle findUnique
   */
  export type SubscriptionCycleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionCycle to fetch.
     */
    where: SubscriptionCycleWhereUniqueInput
  }

  /**
   * SubscriptionCycle findUniqueOrThrow
   */
  export type SubscriptionCycleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionCycle to fetch.
     */
    where: SubscriptionCycleWhereUniqueInput
  }

  /**
   * SubscriptionCycle findFirst
   */
  export type SubscriptionCycleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionCycle to fetch.
     */
    where?: SubscriptionCycleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionCycles to fetch.
     */
    orderBy?: SubscriptionCycleOrderByWithRelationInput | SubscriptionCycleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionCycles.
     */
    cursor?: SubscriptionCycleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionCycles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionCycles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionCycles.
     */
    distinct?: SubscriptionCycleScalarFieldEnum | SubscriptionCycleScalarFieldEnum[]
  }

  /**
   * SubscriptionCycle findFirstOrThrow
   */
  export type SubscriptionCycleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionCycle to fetch.
     */
    where?: SubscriptionCycleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionCycles to fetch.
     */
    orderBy?: SubscriptionCycleOrderByWithRelationInput | SubscriptionCycleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionCycles.
     */
    cursor?: SubscriptionCycleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionCycles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionCycles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionCycles.
     */
    distinct?: SubscriptionCycleScalarFieldEnum | SubscriptionCycleScalarFieldEnum[]
  }

  /**
   * SubscriptionCycle findMany
   */
  export type SubscriptionCycleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionCycles to fetch.
     */
    where?: SubscriptionCycleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionCycles to fetch.
     */
    orderBy?: SubscriptionCycleOrderByWithRelationInput | SubscriptionCycleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubscriptionCycles.
     */
    cursor?: SubscriptionCycleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionCycles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionCycles.
     */
    skip?: number
    distinct?: SubscriptionCycleScalarFieldEnum | SubscriptionCycleScalarFieldEnum[]
  }

  /**
   * SubscriptionCycle create
   */
  export type SubscriptionCycleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
    /**
     * The data needed to create a SubscriptionCycle.
     */
    data: XOR<SubscriptionCycleCreateInput, SubscriptionCycleUncheckedCreateInput>
  }

  /**
   * SubscriptionCycle createMany
   */
  export type SubscriptionCycleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubscriptionCycles.
     */
    data: SubscriptionCycleCreateManyInput | SubscriptionCycleCreateManyInput[]
  }

  /**
   * SubscriptionCycle createManyAndReturn
   */
  export type SubscriptionCycleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * The data used to create many SubscriptionCycles.
     */
    data: SubscriptionCycleCreateManyInput | SubscriptionCycleCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubscriptionCycle update
   */
  export type SubscriptionCycleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
    /**
     * The data needed to update a SubscriptionCycle.
     */
    data: XOR<SubscriptionCycleUpdateInput, SubscriptionCycleUncheckedUpdateInput>
    /**
     * Choose, which SubscriptionCycle to update.
     */
    where: SubscriptionCycleWhereUniqueInput
  }

  /**
   * SubscriptionCycle updateMany
   */
  export type SubscriptionCycleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubscriptionCycles.
     */
    data: XOR<SubscriptionCycleUpdateManyMutationInput, SubscriptionCycleUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionCycles to update
     */
    where?: SubscriptionCycleWhereInput
    /**
     * Limit how many SubscriptionCycles to update.
     */
    limit?: number
  }

  /**
   * SubscriptionCycle updateManyAndReturn
   */
  export type SubscriptionCycleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * The data used to update SubscriptionCycles.
     */
    data: XOR<SubscriptionCycleUpdateManyMutationInput, SubscriptionCycleUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionCycles to update
     */
    where?: SubscriptionCycleWhereInput
    /**
     * Limit how many SubscriptionCycles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubscriptionCycle upsert
   */
  export type SubscriptionCycleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
    /**
     * The filter to search for the SubscriptionCycle to update in case it exists.
     */
    where: SubscriptionCycleWhereUniqueInput
    /**
     * In case the SubscriptionCycle found by the `where` argument doesn't exist, create a new SubscriptionCycle with this data.
     */
    create: XOR<SubscriptionCycleCreateInput, SubscriptionCycleUncheckedCreateInput>
    /**
     * In case the SubscriptionCycle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionCycleUpdateInput, SubscriptionCycleUncheckedUpdateInput>
  }

  /**
   * SubscriptionCycle delete
   */
  export type SubscriptionCycleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
    /**
     * Filter which SubscriptionCycle to delete.
     */
    where: SubscriptionCycleWhereUniqueInput
  }

  /**
   * SubscriptionCycle deleteMany
   */
  export type SubscriptionCycleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionCycles to delete
     */
    where?: SubscriptionCycleWhereInput
    /**
     * Limit how many SubscriptionCycles to delete.
     */
    limit?: number
  }

  /**
   * SubscriptionCycle without action
   */
  export type SubscriptionCycleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCycle
     */
    select?: SubscriptionCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCycle
     */
    omit?: SubscriptionCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCycleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    status: 'status',
    kycStatus: 'kycStatus',
    planId: 'planId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    email: 'email',
    name: 'name',
    role: 'role',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PlanScalarFieldEnum: {
    id: 'id',
    name: 'name',
    gmvThreshold: 'gmvThreshold',
    monthlyPrice: 'monthlyPrice'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    prefix: 'prefix',
    keyHash: 'keyHash',
    lastUsedAt: 'lastUsedAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const PspCredentialScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    provider: 'provider',
    encryptedKeys: 'encryptedKeys',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PspCredentialScalarFieldEnum = (typeof PspCredentialScalarFieldEnum)[keyof typeof PspCredentialScalarFieldEnum]


  export const PaymentIntentScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    provider: 'provider',
    amountCents: 'amountCents',
    currency: 'currency',
    status: 'status',
    idempotencyKey: 'idempotencyKey',
    externalRef: 'externalRef',
    metadata: 'metadata',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentIntentScalarFieldEnum = (typeof PaymentIntentScalarFieldEnum)[keyof typeof PaymentIntentScalarFieldEnum]


  export const PayoutScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    provider: 'provider',
    payeeRef: 'payeeRef',
    amountCents: 'amountCents',
    currency: 'currency',
    status: 'status',
    idempotencyKey: 'idempotencyKey',
    externalRef: 'externalRef',
    createdByUserId: 'createdByUserId',
    approvedById: 'approvedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PayoutScalarFieldEnum = (typeof PayoutScalarFieldEnum)[keyof typeof PayoutScalarFieldEnum]


  export const LedgerEntryScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    account: 'account',
    debitCents: 'debitCents',
    creditCents: 'creditCents',
    refType: 'refType',
    refId: 'refId',
    createdAt: 'createdAt'
  };

  export type LedgerEntryScalarFieldEnum = (typeof LedgerEntryScalarFieldEnum)[keyof typeof LedgerEntryScalarFieldEnum]


  export const WebhookEventScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    eventId: 'eventId',
    tenantId: 'tenantId',
    payload: 'payload',
    signatureValid: 'signatureValid',
    processedAt: 'processedAt',
    receivedAt: 'receivedAt'
  };

  export type WebhookEventScalarFieldEnum = (typeof WebhookEventScalarFieldEnum)[keyof typeof WebhookEventScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    userId: 'userId',
    apiKeyId: 'apiKeyId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SubscriptionCycleScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    gmvSnapshot: 'gmvSnapshot',
    tierApplied: 'tierApplied',
    amountCents: 'amountCents',
    invoicedAt: 'invoicedAt',
    createdAt: 'createdAt'
  };

  export type SubscriptionCycleScalarFieldEnum = (typeof SubscriptionCycleScalarFieldEnum)[keyof typeof SubscriptionCycleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    slug?: StringFilter<"Tenant"> | string
    status?: StringFilter<"Tenant"> | string
    kycStatus?: StringFilter<"Tenant"> | string
    planId?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    plan?: XOR<PlanNullableScalarRelationFilter, PlanWhereInput> | null
    users?: UserListRelationFilter
    apiKeys?: ApiKeyListRelationFilter
    credentials?: PspCredentialListRelationFilter
    intents?: PaymentIntentListRelationFilter
    payouts?: PayoutListRelationFilter
    ledgerEntries?: LedgerEntryListRelationFilter
    cycles?: SubscriptionCycleListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    kycStatus?: SortOrder
    planId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    plan?: PlanOrderByWithRelationInput
    users?: UserOrderByRelationAggregateInput
    apiKeys?: ApiKeyOrderByRelationAggregateInput
    credentials?: PspCredentialOrderByRelationAggregateInput
    intents?: PaymentIntentOrderByRelationAggregateInput
    payouts?: PayoutOrderByRelationAggregateInput
    ledgerEntries?: LedgerEntryOrderByRelationAggregateInput
    cycles?: SubscriptionCycleOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    status?: StringFilter<"Tenant"> | string
    kycStatus?: StringFilter<"Tenant"> | string
    planId?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    plan?: XOR<PlanNullableScalarRelationFilter, PlanWhereInput> | null
    users?: UserListRelationFilter
    apiKeys?: ApiKeyListRelationFilter
    credentials?: PspCredentialListRelationFilter
    intents?: PaymentIntentListRelationFilter
    payouts?: PayoutListRelationFilter
    ledgerEntries?: LedgerEntryListRelationFilter
    cycles?: SubscriptionCycleListRelationFilter
  }, "id" | "slug">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    kycStatus?: SortOrder
    planId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    slug?: StringWithAggregatesFilter<"Tenant"> | string
    status?: StringWithAggregatesFilter<"Tenant"> | string
    kycStatus?: StringWithAggregatesFilter<"Tenant"> | string
    planId?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    tenantId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    tenantId?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    tenantId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: StringFilter<"Plan"> | string
    name?: StringFilter<"Plan"> | string
    gmvThreshold?: BigIntFilter<"Plan"> | bigint | number
    monthlyPrice?: BigIntFilter<"Plan"> | bigint | number
    tenants?: TenantListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    gmvThreshold?: SortOrder
    monthlyPrice?: SortOrder
    tenants?: TenantOrderByRelationAggregateInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    gmvThreshold?: BigIntFilter<"Plan"> | bigint | number
    monthlyPrice?: BigIntFilter<"Plan"> | bigint | number
    tenants?: TenantListRelationFilter
  }, "id" | "name">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    gmvThreshold?: SortOrder
    monthlyPrice?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plan"> | string
    name?: StringWithAggregatesFilter<"Plan"> | string
    gmvThreshold?: BigIntWithAggregatesFilter<"Plan"> | bigint | number
    monthlyPrice?: BigIntWithAggregatesFilter<"Plan"> | bigint | number
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    tenantId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    prefix?: StringFilter<"ApiKey"> | string
    keyHash?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    prefix?: SortOrder
    keyHash?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_prefix?: ApiKeyTenantIdPrefixCompoundUniqueInput
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    tenantId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    prefix?: StringFilter<"ApiKey"> | string
    keyHash?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id" | "tenantId_prefix">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    prefix?: SortOrder
    keyHash?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    tenantId?: StringWithAggregatesFilter<"ApiKey"> | string
    name?: StringWithAggregatesFilter<"ApiKey"> | string
    prefix?: StringWithAggregatesFilter<"ApiKey"> | string
    keyHash?: StringWithAggregatesFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
  }

  export type PspCredentialWhereInput = {
    AND?: PspCredentialWhereInput | PspCredentialWhereInput[]
    OR?: PspCredentialWhereInput[]
    NOT?: PspCredentialWhereInput | PspCredentialWhereInput[]
    id?: StringFilter<"PspCredential"> | string
    tenantId?: StringFilter<"PspCredential"> | string
    provider?: StringFilter<"PspCredential"> | string
    encryptedKeys?: StringFilter<"PspCredential"> | string
    createdAt?: DateTimeFilter<"PspCredential"> | Date | string
    updatedAt?: DateTimeFilter<"PspCredential"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type PspCredentialOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    encryptedKeys?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type PspCredentialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_provider?: PspCredentialTenantIdProviderCompoundUniqueInput
    AND?: PspCredentialWhereInput | PspCredentialWhereInput[]
    OR?: PspCredentialWhereInput[]
    NOT?: PspCredentialWhereInput | PspCredentialWhereInput[]
    tenantId?: StringFilter<"PspCredential"> | string
    provider?: StringFilter<"PspCredential"> | string
    encryptedKeys?: StringFilter<"PspCredential"> | string
    createdAt?: DateTimeFilter<"PspCredential"> | Date | string
    updatedAt?: DateTimeFilter<"PspCredential"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id" | "tenantId_provider">

  export type PspCredentialOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    encryptedKeys?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PspCredentialCountOrderByAggregateInput
    _max?: PspCredentialMaxOrderByAggregateInput
    _min?: PspCredentialMinOrderByAggregateInput
  }

  export type PspCredentialScalarWhereWithAggregatesInput = {
    AND?: PspCredentialScalarWhereWithAggregatesInput | PspCredentialScalarWhereWithAggregatesInput[]
    OR?: PspCredentialScalarWhereWithAggregatesInput[]
    NOT?: PspCredentialScalarWhereWithAggregatesInput | PspCredentialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PspCredential"> | string
    tenantId?: StringWithAggregatesFilter<"PspCredential"> | string
    provider?: StringWithAggregatesFilter<"PspCredential"> | string
    encryptedKeys?: StringWithAggregatesFilter<"PspCredential"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PspCredential"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PspCredential"> | Date | string
  }

  export type PaymentIntentWhereInput = {
    AND?: PaymentIntentWhereInput | PaymentIntentWhereInput[]
    OR?: PaymentIntentWhereInput[]
    NOT?: PaymentIntentWhereInput | PaymentIntentWhereInput[]
    id?: StringFilter<"PaymentIntent"> | string
    tenantId?: StringFilter<"PaymentIntent"> | string
    provider?: StringFilter<"PaymentIntent"> | string
    amountCents?: BigIntFilter<"PaymentIntent"> | bigint | number
    currency?: StringFilter<"PaymentIntent"> | string
    status?: StringFilter<"PaymentIntent"> | string
    idempotencyKey?: StringFilter<"PaymentIntent"> | string
    externalRef?: StringNullableFilter<"PaymentIntent"> | string | null
    metadata?: StringNullableFilter<"PaymentIntent"> | string | null
    expiresAt?: DateTimeNullableFilter<"PaymentIntent"> | Date | string | null
    createdAt?: DateTimeFilter<"PaymentIntent"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentIntent"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type PaymentIntentOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    amountCents?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    idempotencyKey?: SortOrder
    externalRef?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type PaymentIntentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_idempotencyKey?: PaymentIntentTenantIdIdempotencyKeyCompoundUniqueInput
    AND?: PaymentIntentWhereInput | PaymentIntentWhereInput[]
    OR?: PaymentIntentWhereInput[]
    NOT?: PaymentIntentWhereInput | PaymentIntentWhereInput[]
    tenantId?: StringFilter<"PaymentIntent"> | string
    provider?: StringFilter<"PaymentIntent"> | string
    amountCents?: BigIntFilter<"PaymentIntent"> | bigint | number
    currency?: StringFilter<"PaymentIntent"> | string
    status?: StringFilter<"PaymentIntent"> | string
    idempotencyKey?: StringFilter<"PaymentIntent"> | string
    externalRef?: StringNullableFilter<"PaymentIntent"> | string | null
    metadata?: StringNullableFilter<"PaymentIntent"> | string | null
    expiresAt?: DateTimeNullableFilter<"PaymentIntent"> | Date | string | null
    createdAt?: DateTimeFilter<"PaymentIntent"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentIntent"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id" | "tenantId_idempotencyKey">

  export type PaymentIntentOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    amountCents?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    idempotencyKey?: SortOrder
    externalRef?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentIntentCountOrderByAggregateInput
    _avg?: PaymentIntentAvgOrderByAggregateInput
    _max?: PaymentIntentMaxOrderByAggregateInput
    _min?: PaymentIntentMinOrderByAggregateInput
    _sum?: PaymentIntentSumOrderByAggregateInput
  }

  export type PaymentIntentScalarWhereWithAggregatesInput = {
    AND?: PaymentIntentScalarWhereWithAggregatesInput | PaymentIntentScalarWhereWithAggregatesInput[]
    OR?: PaymentIntentScalarWhereWithAggregatesInput[]
    NOT?: PaymentIntentScalarWhereWithAggregatesInput | PaymentIntentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentIntent"> | string
    tenantId?: StringWithAggregatesFilter<"PaymentIntent"> | string
    provider?: StringWithAggregatesFilter<"PaymentIntent"> | string
    amountCents?: BigIntWithAggregatesFilter<"PaymentIntent"> | bigint | number
    currency?: StringWithAggregatesFilter<"PaymentIntent"> | string
    status?: StringWithAggregatesFilter<"PaymentIntent"> | string
    idempotencyKey?: StringWithAggregatesFilter<"PaymentIntent"> | string
    externalRef?: StringNullableWithAggregatesFilter<"PaymentIntent"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"PaymentIntent"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"PaymentIntent"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PaymentIntent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentIntent"> | Date | string
  }

  export type PayoutWhereInput = {
    AND?: PayoutWhereInput | PayoutWhereInput[]
    OR?: PayoutWhereInput[]
    NOT?: PayoutWhereInput | PayoutWhereInput[]
    id?: StringFilter<"Payout"> | string
    tenantId?: StringFilter<"Payout"> | string
    provider?: StringFilter<"Payout"> | string
    payeeRef?: StringFilter<"Payout"> | string
    amountCents?: BigIntFilter<"Payout"> | bigint | number
    currency?: StringFilter<"Payout"> | string
    status?: StringFilter<"Payout"> | string
    idempotencyKey?: StringFilter<"Payout"> | string
    externalRef?: StringNullableFilter<"Payout"> | string | null
    createdByUserId?: StringNullableFilter<"Payout"> | string | null
    approvedById?: StringNullableFilter<"Payout"> | string | null
    createdAt?: DateTimeFilter<"Payout"> | Date | string
    updatedAt?: DateTimeFilter<"Payout"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type PayoutOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    payeeRef?: SortOrder
    amountCents?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    idempotencyKey?: SortOrder
    externalRef?: SortOrderInput | SortOrder
    createdByUserId?: SortOrderInput | SortOrder
    approvedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type PayoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_idempotencyKey?: PayoutTenantIdIdempotencyKeyCompoundUniqueInput
    AND?: PayoutWhereInput | PayoutWhereInput[]
    OR?: PayoutWhereInput[]
    NOT?: PayoutWhereInput | PayoutWhereInput[]
    tenantId?: StringFilter<"Payout"> | string
    provider?: StringFilter<"Payout"> | string
    payeeRef?: StringFilter<"Payout"> | string
    amountCents?: BigIntFilter<"Payout"> | bigint | number
    currency?: StringFilter<"Payout"> | string
    status?: StringFilter<"Payout"> | string
    idempotencyKey?: StringFilter<"Payout"> | string
    externalRef?: StringNullableFilter<"Payout"> | string | null
    createdByUserId?: StringNullableFilter<"Payout"> | string | null
    approvedById?: StringNullableFilter<"Payout"> | string | null
    createdAt?: DateTimeFilter<"Payout"> | Date | string
    updatedAt?: DateTimeFilter<"Payout"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id" | "tenantId_idempotencyKey">

  export type PayoutOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    payeeRef?: SortOrder
    amountCents?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    idempotencyKey?: SortOrder
    externalRef?: SortOrderInput | SortOrder
    createdByUserId?: SortOrderInput | SortOrder
    approvedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PayoutCountOrderByAggregateInput
    _avg?: PayoutAvgOrderByAggregateInput
    _max?: PayoutMaxOrderByAggregateInput
    _min?: PayoutMinOrderByAggregateInput
    _sum?: PayoutSumOrderByAggregateInput
  }

  export type PayoutScalarWhereWithAggregatesInput = {
    AND?: PayoutScalarWhereWithAggregatesInput | PayoutScalarWhereWithAggregatesInput[]
    OR?: PayoutScalarWhereWithAggregatesInput[]
    NOT?: PayoutScalarWhereWithAggregatesInput | PayoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payout"> | string
    tenantId?: StringWithAggregatesFilter<"Payout"> | string
    provider?: StringWithAggregatesFilter<"Payout"> | string
    payeeRef?: StringWithAggregatesFilter<"Payout"> | string
    amountCents?: BigIntWithAggregatesFilter<"Payout"> | bigint | number
    currency?: StringWithAggregatesFilter<"Payout"> | string
    status?: StringWithAggregatesFilter<"Payout"> | string
    idempotencyKey?: StringWithAggregatesFilter<"Payout"> | string
    externalRef?: StringNullableWithAggregatesFilter<"Payout"> | string | null
    createdByUserId?: StringNullableWithAggregatesFilter<"Payout"> | string | null
    approvedById?: StringNullableWithAggregatesFilter<"Payout"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payout"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payout"> | Date | string
  }

  export type LedgerEntryWhereInput = {
    AND?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    OR?: LedgerEntryWhereInput[]
    NOT?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    id?: StringFilter<"LedgerEntry"> | string
    tenantId?: StringFilter<"LedgerEntry"> | string
    account?: StringFilter<"LedgerEntry"> | string
    debitCents?: BigIntFilter<"LedgerEntry"> | bigint | number
    creditCents?: BigIntFilter<"LedgerEntry"> | bigint | number
    refType?: StringNullableFilter<"LedgerEntry"> | string | null
    refId?: StringNullableFilter<"LedgerEntry"> | string | null
    createdAt?: DateTimeFilter<"LedgerEntry"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type LedgerEntryOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    account?: SortOrder
    debitCents?: SortOrder
    creditCents?: SortOrder
    refType?: SortOrderInput | SortOrder
    refId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type LedgerEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    OR?: LedgerEntryWhereInput[]
    NOT?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    tenantId?: StringFilter<"LedgerEntry"> | string
    account?: StringFilter<"LedgerEntry"> | string
    debitCents?: BigIntFilter<"LedgerEntry"> | bigint | number
    creditCents?: BigIntFilter<"LedgerEntry"> | bigint | number
    refType?: StringNullableFilter<"LedgerEntry"> | string | null
    refId?: StringNullableFilter<"LedgerEntry"> | string | null
    createdAt?: DateTimeFilter<"LedgerEntry"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id">

  export type LedgerEntryOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    account?: SortOrder
    debitCents?: SortOrder
    creditCents?: SortOrder
    refType?: SortOrderInput | SortOrder
    refId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LedgerEntryCountOrderByAggregateInput
    _avg?: LedgerEntryAvgOrderByAggregateInput
    _max?: LedgerEntryMaxOrderByAggregateInput
    _min?: LedgerEntryMinOrderByAggregateInput
    _sum?: LedgerEntrySumOrderByAggregateInput
  }

  export type LedgerEntryScalarWhereWithAggregatesInput = {
    AND?: LedgerEntryScalarWhereWithAggregatesInput | LedgerEntryScalarWhereWithAggregatesInput[]
    OR?: LedgerEntryScalarWhereWithAggregatesInput[]
    NOT?: LedgerEntryScalarWhereWithAggregatesInput | LedgerEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LedgerEntry"> | string
    tenantId?: StringWithAggregatesFilter<"LedgerEntry"> | string
    account?: StringWithAggregatesFilter<"LedgerEntry"> | string
    debitCents?: BigIntWithAggregatesFilter<"LedgerEntry"> | bigint | number
    creditCents?: BigIntWithAggregatesFilter<"LedgerEntry"> | bigint | number
    refType?: StringNullableWithAggregatesFilter<"LedgerEntry"> | string | null
    refId?: StringNullableWithAggregatesFilter<"LedgerEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LedgerEntry"> | Date | string
  }

  export type WebhookEventWhereInput = {
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[]
    OR?: WebhookEventWhereInput[]
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[]
    id?: StringFilter<"WebhookEvent"> | string
    provider?: StringFilter<"WebhookEvent"> | string
    eventId?: StringNullableFilter<"WebhookEvent"> | string | null
    tenantId?: StringNullableFilter<"WebhookEvent"> | string | null
    payload?: JsonFilter<"WebhookEvent">
    signatureValid?: BoolFilter<"WebhookEvent"> | boolean
    processedAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
    receivedAt?: DateTimeFilter<"WebhookEvent"> | Date | string
  }

  export type WebhookEventOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrderInput | SortOrder
    tenantId?: SortOrderInput | SortOrder
    payload?: SortOrder
    signatureValid?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    receivedAt?: SortOrder
  }

  export type WebhookEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[]
    OR?: WebhookEventWhereInput[]
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[]
    provider?: StringFilter<"WebhookEvent"> | string
    eventId?: StringNullableFilter<"WebhookEvent"> | string | null
    tenantId?: StringNullableFilter<"WebhookEvent"> | string | null
    payload?: JsonFilter<"WebhookEvent">
    signatureValid?: BoolFilter<"WebhookEvent"> | boolean
    processedAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
    receivedAt?: DateTimeFilter<"WebhookEvent"> | Date | string
  }, "id">

  export type WebhookEventOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrderInput | SortOrder
    tenantId?: SortOrderInput | SortOrder
    payload?: SortOrder
    signatureValid?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    receivedAt?: SortOrder
    _count?: WebhookEventCountOrderByAggregateInput
    _max?: WebhookEventMaxOrderByAggregateInput
    _min?: WebhookEventMinOrderByAggregateInput
  }

  export type WebhookEventScalarWhereWithAggregatesInput = {
    AND?: WebhookEventScalarWhereWithAggregatesInput | WebhookEventScalarWhereWithAggregatesInput[]
    OR?: WebhookEventScalarWhereWithAggregatesInput[]
    NOT?: WebhookEventScalarWhereWithAggregatesInput | WebhookEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookEvent"> | string
    provider?: StringWithAggregatesFilter<"WebhookEvent"> | string
    eventId?: StringNullableWithAggregatesFilter<"WebhookEvent"> | string | null
    tenantId?: StringNullableWithAggregatesFilter<"WebhookEvent"> | string | null
    payload?: JsonWithAggregatesFilter<"WebhookEvent">
    signatureValid?: BoolWithAggregatesFilter<"WebhookEvent"> | boolean
    processedAt?: DateTimeNullableWithAggregatesFilter<"WebhookEvent"> | Date | string | null
    receivedAt?: DateTimeWithAggregatesFilter<"WebhookEvent"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    tenantId?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    apiKeyId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    metadata?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    apiKeyId?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    tenantId?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    apiKeyId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    metadata?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    apiKeyId?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    tenantId?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    apiKeyId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    metadata?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type SubscriptionCycleWhereInput = {
    AND?: SubscriptionCycleWhereInput | SubscriptionCycleWhereInput[]
    OR?: SubscriptionCycleWhereInput[]
    NOT?: SubscriptionCycleWhereInput | SubscriptionCycleWhereInput[]
    id?: StringFilter<"SubscriptionCycle"> | string
    tenantId?: StringFilter<"SubscriptionCycle"> | string
    periodStart?: DateTimeFilter<"SubscriptionCycle"> | Date | string
    periodEnd?: DateTimeFilter<"SubscriptionCycle"> | Date | string
    gmvSnapshot?: BigIntFilter<"SubscriptionCycle"> | bigint | number
    tierApplied?: StringFilter<"SubscriptionCycle"> | string
    amountCents?: BigIntFilter<"SubscriptionCycle"> | bigint | number
    invoicedAt?: DateTimeNullableFilter<"SubscriptionCycle"> | Date | string | null
    createdAt?: DateTimeFilter<"SubscriptionCycle"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }

  export type SubscriptionCycleOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    gmvSnapshot?: SortOrder
    tierApplied?: SortOrder
    amountCents?: SortOrder
    invoicedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type SubscriptionCycleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_periodStart?: SubscriptionCycleTenantIdPeriodStartCompoundUniqueInput
    AND?: SubscriptionCycleWhereInput | SubscriptionCycleWhereInput[]
    OR?: SubscriptionCycleWhereInput[]
    NOT?: SubscriptionCycleWhereInput | SubscriptionCycleWhereInput[]
    tenantId?: StringFilter<"SubscriptionCycle"> | string
    periodStart?: DateTimeFilter<"SubscriptionCycle"> | Date | string
    periodEnd?: DateTimeFilter<"SubscriptionCycle"> | Date | string
    gmvSnapshot?: BigIntFilter<"SubscriptionCycle"> | bigint | number
    tierApplied?: StringFilter<"SubscriptionCycle"> | string
    amountCents?: BigIntFilter<"SubscriptionCycle"> | bigint | number
    invoicedAt?: DateTimeNullableFilter<"SubscriptionCycle"> | Date | string | null
    createdAt?: DateTimeFilter<"SubscriptionCycle"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
  }, "id" | "tenantId_periodStart">

  export type SubscriptionCycleOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    gmvSnapshot?: SortOrder
    tierApplied?: SortOrder
    amountCents?: SortOrder
    invoicedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SubscriptionCycleCountOrderByAggregateInput
    _avg?: SubscriptionCycleAvgOrderByAggregateInput
    _max?: SubscriptionCycleMaxOrderByAggregateInput
    _min?: SubscriptionCycleMinOrderByAggregateInput
    _sum?: SubscriptionCycleSumOrderByAggregateInput
  }

  export type SubscriptionCycleScalarWhereWithAggregatesInput = {
    AND?: SubscriptionCycleScalarWhereWithAggregatesInput | SubscriptionCycleScalarWhereWithAggregatesInput[]
    OR?: SubscriptionCycleScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionCycleScalarWhereWithAggregatesInput | SubscriptionCycleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SubscriptionCycle"> | string
    tenantId?: StringWithAggregatesFilter<"SubscriptionCycle"> | string
    periodStart?: DateTimeWithAggregatesFilter<"SubscriptionCycle"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"SubscriptionCycle"> | Date | string
    gmvSnapshot?: BigIntWithAggregatesFilter<"SubscriptionCycle"> | bigint | number
    tierApplied?: StringWithAggregatesFilter<"SubscriptionCycle"> | string
    amountCents?: BigIntWithAggregatesFilter<"SubscriptionCycle"> | bigint | number
    invoicedAt?: DateTimeNullableWithAggregatesFilter<"SubscriptionCycle"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SubscriptionCycle"> | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan?: PlanCreateNestedOneWithoutTenantsInput
    users?: UserCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentCreateNestedManyWithoutTenantInput
    payouts?: PayoutCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    planId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialUncheckedCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentUncheckedCreateNestedManyWithoutTenantInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneWithoutTenantsNestedInput
    users?: UserUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUncheckedUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUncheckedUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    planId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    passwordHash: string
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    tenantId: string
    email: string
    name?: string | null
    role?: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    tenantId: string
    email: string
    name?: string | null
    role?: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCreateInput = {
    id?: string
    name: string
    gmvThreshold: bigint | number
    monthlyPrice: bigint | number
    tenants?: TenantCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateInput = {
    id?: string
    name: string
    gmvThreshold: bigint | number
    monthlyPrice: bigint | number
    tenants?: TenantUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gmvThreshold?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    tenants?: TenantUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gmvThreshold?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    tenants?: TenantUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateManyInput = {
    id?: string
    name: string
    gmvThreshold: bigint | number
    monthlyPrice: bigint | number
  }

  export type PlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gmvThreshold?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyPrice?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gmvThreshold?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyPrice?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type ApiKeyCreateInput = {
    id?: string
    name: string
    prefix: string
    keyHash: string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutApiKeysInput
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    prefix: string
    keyHash: string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutApiKeysNestedInput
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    prefix: string
    keyHash: string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PspCredentialCreateInput = {
    id?: string
    provider: string
    encryptedKeys: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCredentialsInput
  }

  export type PspCredentialUncheckedCreateInput = {
    id?: string
    tenantId: string
    provider: string
    encryptedKeys: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PspCredentialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    encryptedKeys?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCredentialsNestedInput
  }

  export type PspCredentialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    encryptedKeys?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PspCredentialCreateManyInput = {
    id?: string
    tenantId: string
    provider: string
    encryptedKeys: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PspCredentialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    encryptedKeys?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PspCredentialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    encryptedKeys?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentCreateInput = {
    id?: string
    provider: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    metadata?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutIntentsInput
  }

  export type PaymentIntentUncheckedCreateInput = {
    id?: string
    tenantId: string
    provider: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    metadata?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentIntentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutIntentsNestedInput
  }

  export type PaymentIntentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentCreateManyInput = {
    id?: string
    tenantId: string
    provider: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    metadata?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentIntentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutCreateInput = {
    id?: string
    provider: string
    payeeRef: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    createdByUserId?: string | null
    approvedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutPayoutsInput
  }

  export type PayoutUncheckedCreateInput = {
    id?: string
    tenantId: string
    provider: string
    payeeRef: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    createdByUserId?: string | null
    approvedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PayoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payeeRef?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutPayoutsNestedInput
  }

  export type PayoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payeeRef?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutCreateManyInput = {
    id?: string
    tenantId: string
    provider: string
    payeeRef: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    createdByUserId?: string | null
    approvedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PayoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payeeRef?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payeeRef?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryCreateInput = {
    id?: string
    account: string
    debitCents?: bigint | number
    creditCents?: bigint | number
    refType?: string | null
    refId?: string | null
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutLedgerEntriesInput
  }

  export type LedgerEntryUncheckedCreateInput = {
    id?: string
    tenantId: string
    account: string
    debitCents?: bigint | number
    creditCents?: bigint | number
    refType?: string | null
    refId?: string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    debitCents?: BigIntFieldUpdateOperationsInput | bigint | number
    creditCents?: BigIntFieldUpdateOperationsInput | bigint | number
    refType?: NullableStringFieldUpdateOperationsInput | string | null
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutLedgerEntriesNestedInput
  }

  export type LedgerEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    debitCents?: BigIntFieldUpdateOperationsInput | bigint | number
    creditCents?: BigIntFieldUpdateOperationsInput | bigint | number
    refType?: NullableStringFieldUpdateOperationsInput | string | null
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryCreateManyInput = {
    id?: string
    tenantId: string
    account: string
    debitCents?: bigint | number
    creditCents?: bigint | number
    refType?: string | null
    refId?: string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    debitCents?: BigIntFieldUpdateOperationsInput | bigint | number
    creditCents?: BigIntFieldUpdateOperationsInput | bigint | number
    refType?: NullableStringFieldUpdateOperationsInput | string | null
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    debitCents?: BigIntFieldUpdateOperationsInput | bigint | number
    creditCents?: BigIntFieldUpdateOperationsInput | bigint | number
    refType?: NullableStringFieldUpdateOperationsInput | string | null
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventCreateInput = {
    id?: string
    provider: string
    eventId?: string | null
    tenantId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    signatureValid?: boolean
    processedAt?: Date | string | null
    receivedAt?: Date | string
  }

  export type WebhookEventUncheckedCreateInput = {
    id?: string
    provider: string
    eventId?: string | null
    tenantId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    signatureValid?: boolean
    processedAt?: Date | string | null
    receivedAt?: Date | string
  }

  export type WebhookEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventCreateManyInput = {
    id?: string
    provider: string
    eventId?: string | null
    tenantId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    signatureValid?: boolean
    processedAt?: Date | string | null
    receivedAt?: Date | string
  }

  export type WebhookEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    signatureValid?: BoolFieldUpdateOperationsInput | boolean
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    apiKeyId?: string | null
    action: string
    entity: string
    entityId: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    apiKeyId?: string | null
    action: string
    entity: string
    entityId: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    tenantId: string
    userId?: string | null
    apiKeyId?: string | null
    action: string
    entity: string
    entityId: string
    metadata?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCycleCreateInput = {
    id?: string
    periodStart: Date | string
    periodEnd: Date | string
    gmvSnapshot?: bigint | number
    tierApplied: string
    amountCents: bigint | number
    invoicedAt?: Date | string | null
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutCyclesInput
  }

  export type SubscriptionCycleUncheckedCreateInput = {
    id?: string
    tenantId: string
    periodStart: Date | string
    periodEnd: Date | string
    gmvSnapshot?: bigint | number
    tierApplied: string
    amountCents: bigint | number
    invoicedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SubscriptionCycleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    gmvSnapshot?: BigIntFieldUpdateOperationsInput | bigint | number
    tierApplied?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    invoicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutCyclesNestedInput
  }

  export type SubscriptionCycleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    gmvSnapshot?: BigIntFieldUpdateOperationsInput | bigint | number
    tierApplied?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    invoicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCycleCreateManyInput = {
    id?: string
    tenantId: string
    periodStart: Date | string
    periodEnd: Date | string
    gmvSnapshot?: bigint | number
    tierApplied: string
    amountCents: bigint | number
    invoicedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SubscriptionCycleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    gmvSnapshot?: BigIntFieldUpdateOperationsInput | bigint | number
    tierApplied?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    invoicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCycleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    gmvSnapshot?: BigIntFieldUpdateOperationsInput | bigint | number
    tierApplied?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    invoicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PlanNullableScalarRelationFilter = {
    is?: PlanWhereInput | null
    isNot?: PlanWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type ApiKeyListRelationFilter = {
    every?: ApiKeyWhereInput
    some?: ApiKeyWhereInput
    none?: ApiKeyWhereInput
  }

  export type PspCredentialListRelationFilter = {
    every?: PspCredentialWhereInput
    some?: PspCredentialWhereInput
    none?: PspCredentialWhereInput
  }

  export type PaymentIntentListRelationFilter = {
    every?: PaymentIntentWhereInput
    some?: PaymentIntentWhereInput
    none?: PaymentIntentWhereInput
  }

  export type PayoutListRelationFilter = {
    every?: PayoutWhereInput
    some?: PayoutWhereInput
    none?: PayoutWhereInput
  }

  export type LedgerEntryListRelationFilter = {
    every?: LedgerEntryWhereInput
    some?: LedgerEntryWhereInput
    none?: LedgerEntryWhereInput
  }

  export type SubscriptionCycleListRelationFilter = {
    every?: SubscriptionCycleWhereInput
    some?: SubscriptionCycleWhereInput
    none?: SubscriptionCycleWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PspCredentialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentIntentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PayoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LedgerEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionCycleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    kycStatus?: SortOrder
    planId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    kycStatus?: SortOrder
    planId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    kycStatus?: SortOrder
    planId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TenantScalarRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type TenantListRelationFilter = {
    every?: TenantWhereInput
    some?: TenantWhereInput
    none?: TenantWhereInput
  }

  export type TenantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gmvThreshold?: SortOrder
    monthlyPrice?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    gmvThreshold?: SortOrder
    monthlyPrice?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gmvThreshold?: SortOrder
    monthlyPrice?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gmvThreshold?: SortOrder
    monthlyPrice?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    gmvThreshold?: SortOrder
    monthlyPrice?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ApiKeyTenantIdPrefixCompoundUniqueInput = {
    tenantId: string
    prefix: string
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    prefix?: SortOrder
    keyHash?: SortOrder
    lastUsedAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    prefix?: SortOrder
    keyHash?: SortOrder
    lastUsedAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    prefix?: SortOrder
    keyHash?: SortOrder
    lastUsedAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PspCredentialTenantIdProviderCompoundUniqueInput = {
    tenantId: string
    provider: string
  }

  export type PspCredentialCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    encryptedKeys?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PspCredentialMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    encryptedKeys?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PspCredentialMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    encryptedKeys?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentIntentTenantIdIdempotencyKeyCompoundUniqueInput = {
    tenantId: string
    idempotencyKey: string
  }

  export type PaymentIntentCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    amountCents?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    idempotencyKey?: SortOrder
    externalRef?: SortOrder
    metadata?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentIntentAvgOrderByAggregateInput = {
    amountCents?: SortOrder
  }

  export type PaymentIntentMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    amountCents?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    idempotencyKey?: SortOrder
    externalRef?: SortOrder
    metadata?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentIntentMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    amountCents?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    idempotencyKey?: SortOrder
    externalRef?: SortOrder
    metadata?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentIntentSumOrderByAggregateInput = {
    amountCents?: SortOrder
  }

  export type PayoutTenantIdIdempotencyKeyCompoundUniqueInput = {
    tenantId: string
    idempotencyKey: string
  }

  export type PayoutCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    payeeRef?: SortOrder
    amountCents?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    idempotencyKey?: SortOrder
    externalRef?: SortOrder
    createdByUserId?: SortOrder
    approvedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PayoutAvgOrderByAggregateInput = {
    amountCents?: SortOrder
  }

  export type PayoutMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    payeeRef?: SortOrder
    amountCents?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    idempotencyKey?: SortOrder
    externalRef?: SortOrder
    createdByUserId?: SortOrder
    approvedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PayoutMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    payeeRef?: SortOrder
    amountCents?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    idempotencyKey?: SortOrder
    externalRef?: SortOrder
    createdByUserId?: SortOrder
    approvedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PayoutSumOrderByAggregateInput = {
    amountCents?: SortOrder
  }

  export type LedgerEntryCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    account?: SortOrder
    debitCents?: SortOrder
    creditCents?: SortOrder
    refType?: SortOrder
    refId?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntryAvgOrderByAggregateInput = {
    debitCents?: SortOrder
    creditCents?: SortOrder
  }

  export type LedgerEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    account?: SortOrder
    debitCents?: SortOrder
    creditCents?: SortOrder
    refType?: SortOrder
    refId?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntryMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    account?: SortOrder
    debitCents?: SortOrder
    creditCents?: SortOrder
    refType?: SortOrder
    refId?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntrySumOrderByAggregateInput = {
    debitCents?: SortOrder
    creditCents?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type WebhookEventCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    tenantId?: SortOrder
    payload?: SortOrder
    signatureValid?: SortOrder
    processedAt?: SortOrder
    receivedAt?: SortOrder
  }

  export type WebhookEventMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    tenantId?: SortOrder
    signatureValid?: SortOrder
    processedAt?: SortOrder
    receivedAt?: SortOrder
  }

  export type WebhookEventMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    eventId?: SortOrder
    tenantId?: SortOrder
    signatureValid?: SortOrder
    processedAt?: SortOrder
    receivedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    apiKeyId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    apiKeyId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    apiKeyId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionCycleTenantIdPeriodStartCompoundUniqueInput = {
    tenantId: string
    periodStart: Date | string
  }

  export type SubscriptionCycleCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    gmvSnapshot?: SortOrder
    tierApplied?: SortOrder
    amountCents?: SortOrder
    invoicedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionCycleAvgOrderByAggregateInput = {
    gmvSnapshot?: SortOrder
    amountCents?: SortOrder
  }

  export type SubscriptionCycleMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    gmvSnapshot?: SortOrder
    tierApplied?: SortOrder
    amountCents?: SortOrder
    invoicedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionCycleMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    gmvSnapshot?: SortOrder
    tierApplied?: SortOrder
    amountCents?: SortOrder
    invoicedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionCycleSumOrderByAggregateInput = {
    gmvSnapshot?: SortOrder
    amountCents?: SortOrder
  }

  export type PlanCreateNestedOneWithoutTenantsInput = {
    create?: XOR<PlanCreateWithoutTenantsInput, PlanUncheckedCreateWithoutTenantsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutTenantsInput
    connect?: PlanWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutTenantInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ApiKeyCreateNestedManyWithoutTenantInput = {
    create?: XOR<ApiKeyCreateWithoutTenantInput, ApiKeyUncheckedCreateWithoutTenantInput> | ApiKeyCreateWithoutTenantInput[] | ApiKeyUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutTenantInput | ApiKeyCreateOrConnectWithoutTenantInput[]
    createMany?: ApiKeyCreateManyTenantInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type PspCredentialCreateNestedManyWithoutTenantInput = {
    create?: XOR<PspCredentialCreateWithoutTenantInput, PspCredentialUncheckedCreateWithoutTenantInput> | PspCredentialCreateWithoutTenantInput[] | PspCredentialUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PspCredentialCreateOrConnectWithoutTenantInput | PspCredentialCreateOrConnectWithoutTenantInput[]
    createMany?: PspCredentialCreateManyTenantInputEnvelope
    connect?: PspCredentialWhereUniqueInput | PspCredentialWhereUniqueInput[]
  }

  export type PaymentIntentCreateNestedManyWithoutTenantInput = {
    create?: XOR<PaymentIntentCreateWithoutTenantInput, PaymentIntentUncheckedCreateWithoutTenantInput> | PaymentIntentCreateWithoutTenantInput[] | PaymentIntentUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutTenantInput | PaymentIntentCreateOrConnectWithoutTenantInput[]
    createMany?: PaymentIntentCreateManyTenantInputEnvelope
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
  }

  export type PayoutCreateNestedManyWithoutTenantInput = {
    create?: XOR<PayoutCreateWithoutTenantInput, PayoutUncheckedCreateWithoutTenantInput> | PayoutCreateWithoutTenantInput[] | PayoutUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutTenantInput | PayoutCreateOrConnectWithoutTenantInput[]
    createMany?: PayoutCreateManyTenantInputEnvelope
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
  }

  export type LedgerEntryCreateNestedManyWithoutTenantInput = {
    create?: XOR<LedgerEntryCreateWithoutTenantInput, LedgerEntryUncheckedCreateWithoutTenantInput> | LedgerEntryCreateWithoutTenantInput[] | LedgerEntryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutTenantInput | LedgerEntryCreateOrConnectWithoutTenantInput[]
    createMany?: LedgerEntryCreateManyTenantInputEnvelope
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
  }

  export type SubscriptionCycleCreateNestedManyWithoutTenantInput = {
    create?: XOR<SubscriptionCycleCreateWithoutTenantInput, SubscriptionCycleUncheckedCreateWithoutTenantInput> | SubscriptionCycleCreateWithoutTenantInput[] | SubscriptionCycleUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SubscriptionCycleCreateOrConnectWithoutTenantInput | SubscriptionCycleCreateOrConnectWithoutTenantInput[]
    createMany?: SubscriptionCycleCreateManyTenantInputEnvelope
    connect?: SubscriptionCycleWhereUniqueInput | SubscriptionCycleWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ApiKeyUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<ApiKeyCreateWithoutTenantInput, ApiKeyUncheckedCreateWithoutTenantInput> | ApiKeyCreateWithoutTenantInput[] | ApiKeyUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutTenantInput | ApiKeyCreateOrConnectWithoutTenantInput[]
    createMany?: ApiKeyCreateManyTenantInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type PspCredentialUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<PspCredentialCreateWithoutTenantInput, PspCredentialUncheckedCreateWithoutTenantInput> | PspCredentialCreateWithoutTenantInput[] | PspCredentialUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PspCredentialCreateOrConnectWithoutTenantInput | PspCredentialCreateOrConnectWithoutTenantInput[]
    createMany?: PspCredentialCreateManyTenantInputEnvelope
    connect?: PspCredentialWhereUniqueInput | PspCredentialWhereUniqueInput[]
  }

  export type PaymentIntentUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<PaymentIntentCreateWithoutTenantInput, PaymentIntentUncheckedCreateWithoutTenantInput> | PaymentIntentCreateWithoutTenantInput[] | PaymentIntentUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutTenantInput | PaymentIntentCreateOrConnectWithoutTenantInput[]
    createMany?: PaymentIntentCreateManyTenantInputEnvelope
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
  }

  export type PayoutUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<PayoutCreateWithoutTenantInput, PayoutUncheckedCreateWithoutTenantInput> | PayoutCreateWithoutTenantInput[] | PayoutUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutTenantInput | PayoutCreateOrConnectWithoutTenantInput[]
    createMany?: PayoutCreateManyTenantInputEnvelope
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
  }

  export type LedgerEntryUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<LedgerEntryCreateWithoutTenantInput, LedgerEntryUncheckedCreateWithoutTenantInput> | LedgerEntryCreateWithoutTenantInput[] | LedgerEntryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutTenantInput | LedgerEntryCreateOrConnectWithoutTenantInput[]
    createMany?: LedgerEntryCreateManyTenantInputEnvelope
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
  }

  export type SubscriptionCycleUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<SubscriptionCycleCreateWithoutTenantInput, SubscriptionCycleUncheckedCreateWithoutTenantInput> | SubscriptionCycleCreateWithoutTenantInput[] | SubscriptionCycleUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SubscriptionCycleCreateOrConnectWithoutTenantInput | SubscriptionCycleCreateOrConnectWithoutTenantInput[]
    createMany?: SubscriptionCycleCreateManyTenantInputEnvelope
    connect?: SubscriptionCycleWhereUniqueInput | SubscriptionCycleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PlanUpdateOneWithoutTenantsNestedInput = {
    create?: XOR<PlanCreateWithoutTenantsInput, PlanUncheckedCreateWithoutTenantsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutTenantsInput
    upsert?: PlanUpsertWithoutTenantsInput
    disconnect?: PlanWhereInput | boolean
    delete?: PlanWhereInput | boolean
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutTenantsInput, PlanUpdateWithoutTenantsInput>, PlanUncheckedUpdateWithoutTenantsInput>
  }

  export type UserUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTenantInput | UserUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTenantInput | UserUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTenantInput | UserUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ApiKeyUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ApiKeyCreateWithoutTenantInput, ApiKeyUncheckedCreateWithoutTenantInput> | ApiKeyCreateWithoutTenantInput[] | ApiKeyUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutTenantInput | ApiKeyCreateOrConnectWithoutTenantInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutTenantInput | ApiKeyUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ApiKeyCreateManyTenantInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutTenantInput | ApiKeyUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutTenantInput | ApiKeyUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type PspCredentialUpdateManyWithoutTenantNestedInput = {
    create?: XOR<PspCredentialCreateWithoutTenantInput, PspCredentialUncheckedCreateWithoutTenantInput> | PspCredentialCreateWithoutTenantInput[] | PspCredentialUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PspCredentialCreateOrConnectWithoutTenantInput | PspCredentialCreateOrConnectWithoutTenantInput[]
    upsert?: PspCredentialUpsertWithWhereUniqueWithoutTenantInput | PspCredentialUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: PspCredentialCreateManyTenantInputEnvelope
    set?: PspCredentialWhereUniqueInput | PspCredentialWhereUniqueInput[]
    disconnect?: PspCredentialWhereUniqueInput | PspCredentialWhereUniqueInput[]
    delete?: PspCredentialWhereUniqueInput | PspCredentialWhereUniqueInput[]
    connect?: PspCredentialWhereUniqueInput | PspCredentialWhereUniqueInput[]
    update?: PspCredentialUpdateWithWhereUniqueWithoutTenantInput | PspCredentialUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: PspCredentialUpdateManyWithWhereWithoutTenantInput | PspCredentialUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: PspCredentialScalarWhereInput | PspCredentialScalarWhereInput[]
  }

  export type PaymentIntentUpdateManyWithoutTenantNestedInput = {
    create?: XOR<PaymentIntentCreateWithoutTenantInput, PaymentIntentUncheckedCreateWithoutTenantInput> | PaymentIntentCreateWithoutTenantInput[] | PaymentIntentUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutTenantInput | PaymentIntentCreateOrConnectWithoutTenantInput[]
    upsert?: PaymentIntentUpsertWithWhereUniqueWithoutTenantInput | PaymentIntentUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: PaymentIntentCreateManyTenantInputEnvelope
    set?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    disconnect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    delete?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    update?: PaymentIntentUpdateWithWhereUniqueWithoutTenantInput | PaymentIntentUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: PaymentIntentUpdateManyWithWhereWithoutTenantInput | PaymentIntentUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: PaymentIntentScalarWhereInput | PaymentIntentScalarWhereInput[]
  }

  export type PayoutUpdateManyWithoutTenantNestedInput = {
    create?: XOR<PayoutCreateWithoutTenantInput, PayoutUncheckedCreateWithoutTenantInput> | PayoutCreateWithoutTenantInput[] | PayoutUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutTenantInput | PayoutCreateOrConnectWithoutTenantInput[]
    upsert?: PayoutUpsertWithWhereUniqueWithoutTenantInput | PayoutUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: PayoutCreateManyTenantInputEnvelope
    set?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    disconnect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    delete?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    update?: PayoutUpdateWithWhereUniqueWithoutTenantInput | PayoutUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: PayoutUpdateManyWithWhereWithoutTenantInput | PayoutUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
  }

  export type LedgerEntryUpdateManyWithoutTenantNestedInput = {
    create?: XOR<LedgerEntryCreateWithoutTenantInput, LedgerEntryUncheckedCreateWithoutTenantInput> | LedgerEntryCreateWithoutTenantInput[] | LedgerEntryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutTenantInput | LedgerEntryCreateOrConnectWithoutTenantInput[]
    upsert?: LedgerEntryUpsertWithWhereUniqueWithoutTenantInput | LedgerEntryUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: LedgerEntryCreateManyTenantInputEnvelope
    set?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    disconnect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    delete?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    update?: LedgerEntryUpdateWithWhereUniqueWithoutTenantInput | LedgerEntryUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: LedgerEntryUpdateManyWithWhereWithoutTenantInput | LedgerEntryUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: LedgerEntryScalarWhereInput | LedgerEntryScalarWhereInput[]
  }

  export type SubscriptionCycleUpdateManyWithoutTenantNestedInput = {
    create?: XOR<SubscriptionCycleCreateWithoutTenantInput, SubscriptionCycleUncheckedCreateWithoutTenantInput> | SubscriptionCycleCreateWithoutTenantInput[] | SubscriptionCycleUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SubscriptionCycleCreateOrConnectWithoutTenantInput | SubscriptionCycleCreateOrConnectWithoutTenantInput[]
    upsert?: SubscriptionCycleUpsertWithWhereUniqueWithoutTenantInput | SubscriptionCycleUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: SubscriptionCycleCreateManyTenantInputEnvelope
    set?: SubscriptionCycleWhereUniqueInput | SubscriptionCycleWhereUniqueInput[]
    disconnect?: SubscriptionCycleWhereUniqueInput | SubscriptionCycleWhereUniqueInput[]
    delete?: SubscriptionCycleWhereUniqueInput | SubscriptionCycleWhereUniqueInput[]
    connect?: SubscriptionCycleWhereUniqueInput | SubscriptionCycleWhereUniqueInput[]
    update?: SubscriptionCycleUpdateWithWhereUniqueWithoutTenantInput | SubscriptionCycleUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: SubscriptionCycleUpdateManyWithWhereWithoutTenantInput | SubscriptionCycleUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: SubscriptionCycleScalarWhereInput | SubscriptionCycleScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTenantInput | UserUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTenantInput | UserUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTenantInput | UserUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ApiKeyUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ApiKeyCreateWithoutTenantInput, ApiKeyUncheckedCreateWithoutTenantInput> | ApiKeyCreateWithoutTenantInput[] | ApiKeyUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutTenantInput | ApiKeyCreateOrConnectWithoutTenantInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutTenantInput | ApiKeyUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ApiKeyCreateManyTenantInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutTenantInput | ApiKeyUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutTenantInput | ApiKeyUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type PspCredentialUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<PspCredentialCreateWithoutTenantInput, PspCredentialUncheckedCreateWithoutTenantInput> | PspCredentialCreateWithoutTenantInput[] | PspCredentialUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PspCredentialCreateOrConnectWithoutTenantInput | PspCredentialCreateOrConnectWithoutTenantInput[]
    upsert?: PspCredentialUpsertWithWhereUniqueWithoutTenantInput | PspCredentialUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: PspCredentialCreateManyTenantInputEnvelope
    set?: PspCredentialWhereUniqueInput | PspCredentialWhereUniqueInput[]
    disconnect?: PspCredentialWhereUniqueInput | PspCredentialWhereUniqueInput[]
    delete?: PspCredentialWhereUniqueInput | PspCredentialWhereUniqueInput[]
    connect?: PspCredentialWhereUniqueInput | PspCredentialWhereUniqueInput[]
    update?: PspCredentialUpdateWithWhereUniqueWithoutTenantInput | PspCredentialUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: PspCredentialUpdateManyWithWhereWithoutTenantInput | PspCredentialUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: PspCredentialScalarWhereInput | PspCredentialScalarWhereInput[]
  }

  export type PaymentIntentUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<PaymentIntentCreateWithoutTenantInput, PaymentIntentUncheckedCreateWithoutTenantInput> | PaymentIntentCreateWithoutTenantInput[] | PaymentIntentUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PaymentIntentCreateOrConnectWithoutTenantInput | PaymentIntentCreateOrConnectWithoutTenantInput[]
    upsert?: PaymentIntentUpsertWithWhereUniqueWithoutTenantInput | PaymentIntentUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: PaymentIntentCreateManyTenantInputEnvelope
    set?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    disconnect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    delete?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    connect?: PaymentIntentWhereUniqueInput | PaymentIntentWhereUniqueInput[]
    update?: PaymentIntentUpdateWithWhereUniqueWithoutTenantInput | PaymentIntentUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: PaymentIntentUpdateManyWithWhereWithoutTenantInput | PaymentIntentUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: PaymentIntentScalarWhereInput | PaymentIntentScalarWhereInput[]
  }

  export type PayoutUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<PayoutCreateWithoutTenantInput, PayoutUncheckedCreateWithoutTenantInput> | PayoutCreateWithoutTenantInput[] | PayoutUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutTenantInput | PayoutCreateOrConnectWithoutTenantInput[]
    upsert?: PayoutUpsertWithWhereUniqueWithoutTenantInput | PayoutUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: PayoutCreateManyTenantInputEnvelope
    set?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    disconnect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    delete?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    update?: PayoutUpdateWithWhereUniqueWithoutTenantInput | PayoutUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: PayoutUpdateManyWithWhereWithoutTenantInput | PayoutUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
  }

  export type LedgerEntryUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<LedgerEntryCreateWithoutTenantInput, LedgerEntryUncheckedCreateWithoutTenantInput> | LedgerEntryCreateWithoutTenantInput[] | LedgerEntryUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutTenantInput | LedgerEntryCreateOrConnectWithoutTenantInput[]
    upsert?: LedgerEntryUpsertWithWhereUniqueWithoutTenantInput | LedgerEntryUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: LedgerEntryCreateManyTenantInputEnvelope
    set?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    disconnect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    delete?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    update?: LedgerEntryUpdateWithWhereUniqueWithoutTenantInput | LedgerEntryUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: LedgerEntryUpdateManyWithWhereWithoutTenantInput | LedgerEntryUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: LedgerEntryScalarWhereInput | LedgerEntryScalarWhereInput[]
  }

  export type SubscriptionCycleUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<SubscriptionCycleCreateWithoutTenantInput, SubscriptionCycleUncheckedCreateWithoutTenantInput> | SubscriptionCycleCreateWithoutTenantInput[] | SubscriptionCycleUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SubscriptionCycleCreateOrConnectWithoutTenantInput | SubscriptionCycleCreateOrConnectWithoutTenantInput[]
    upsert?: SubscriptionCycleUpsertWithWhereUniqueWithoutTenantInput | SubscriptionCycleUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: SubscriptionCycleCreateManyTenantInputEnvelope
    set?: SubscriptionCycleWhereUniqueInput | SubscriptionCycleWhereUniqueInput[]
    disconnect?: SubscriptionCycleWhereUniqueInput | SubscriptionCycleWhereUniqueInput[]
    delete?: SubscriptionCycleWhereUniqueInput | SubscriptionCycleWhereUniqueInput[]
    connect?: SubscriptionCycleWhereUniqueInput | SubscriptionCycleWhereUniqueInput[]
    update?: SubscriptionCycleUpdateWithWhereUniqueWithoutTenantInput | SubscriptionCycleUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: SubscriptionCycleUpdateManyWithWhereWithoutTenantInput | SubscriptionCycleUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: SubscriptionCycleScalarWhereInput | SubscriptionCycleScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutUsersInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput
    upsert?: TenantUpsertWithoutUsersInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutUsersInput, TenantUpdateWithoutUsersInput>, TenantUncheckedUpdateWithoutUsersInput>
  }

  export type TenantCreateNestedManyWithoutPlanInput = {
    create?: XOR<TenantCreateWithoutPlanInput, TenantUncheckedCreateWithoutPlanInput> | TenantCreateWithoutPlanInput[] | TenantUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutPlanInput | TenantCreateOrConnectWithoutPlanInput[]
    createMany?: TenantCreateManyPlanInputEnvelope
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
  }

  export type TenantUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<TenantCreateWithoutPlanInput, TenantUncheckedCreateWithoutPlanInput> | TenantCreateWithoutPlanInput[] | TenantUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutPlanInput | TenantCreateOrConnectWithoutPlanInput[]
    createMany?: TenantCreateManyPlanInputEnvelope
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type TenantUpdateManyWithoutPlanNestedInput = {
    create?: XOR<TenantCreateWithoutPlanInput, TenantUncheckedCreateWithoutPlanInput> | TenantCreateWithoutPlanInput[] | TenantUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutPlanInput | TenantCreateOrConnectWithoutPlanInput[]
    upsert?: TenantUpsertWithWhereUniqueWithoutPlanInput | TenantUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: TenantCreateManyPlanInputEnvelope
    set?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    disconnect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    delete?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    update?: TenantUpdateWithWhereUniqueWithoutPlanInput | TenantUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: TenantUpdateManyWithWhereWithoutPlanInput | TenantUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: TenantScalarWhereInput | TenantScalarWhereInput[]
  }

  export type TenantUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<TenantCreateWithoutPlanInput, TenantUncheckedCreateWithoutPlanInput> | TenantCreateWithoutPlanInput[] | TenantUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutPlanInput | TenantCreateOrConnectWithoutPlanInput[]
    upsert?: TenantUpsertWithWhereUniqueWithoutPlanInput | TenantUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: TenantCreateManyPlanInputEnvelope
    set?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    disconnect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    delete?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    update?: TenantUpdateWithWhereUniqueWithoutPlanInput | TenantUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: TenantUpdateManyWithWhereWithoutPlanInput | TenantUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: TenantScalarWhereInput | TenantScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutApiKeysInput = {
    create?: XOR<TenantCreateWithoutApiKeysInput, TenantUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: TenantCreateOrConnectWithoutApiKeysInput
    connect?: TenantWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TenantUpdateOneRequiredWithoutApiKeysNestedInput = {
    create?: XOR<TenantCreateWithoutApiKeysInput, TenantUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: TenantCreateOrConnectWithoutApiKeysInput
    upsert?: TenantUpsertWithoutApiKeysInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutApiKeysInput, TenantUpdateWithoutApiKeysInput>, TenantUncheckedUpdateWithoutApiKeysInput>
  }

  export type TenantCreateNestedOneWithoutCredentialsInput = {
    create?: XOR<TenantCreateWithoutCredentialsInput, TenantUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutCredentialsInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutCredentialsNestedInput = {
    create?: XOR<TenantCreateWithoutCredentialsInput, TenantUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutCredentialsInput
    upsert?: TenantUpsertWithoutCredentialsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutCredentialsInput, TenantUpdateWithoutCredentialsInput>, TenantUncheckedUpdateWithoutCredentialsInput>
  }

  export type TenantCreateNestedOneWithoutIntentsInput = {
    create?: XOR<TenantCreateWithoutIntentsInput, TenantUncheckedCreateWithoutIntentsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutIntentsInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutIntentsNestedInput = {
    create?: XOR<TenantCreateWithoutIntentsInput, TenantUncheckedCreateWithoutIntentsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutIntentsInput
    upsert?: TenantUpsertWithoutIntentsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutIntentsInput, TenantUpdateWithoutIntentsInput>, TenantUncheckedUpdateWithoutIntentsInput>
  }

  export type TenantCreateNestedOneWithoutPayoutsInput = {
    create?: XOR<TenantCreateWithoutPayoutsInput, TenantUncheckedCreateWithoutPayoutsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutPayoutsInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutPayoutsNestedInput = {
    create?: XOR<TenantCreateWithoutPayoutsInput, TenantUncheckedCreateWithoutPayoutsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutPayoutsInput
    upsert?: TenantUpsertWithoutPayoutsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutPayoutsInput, TenantUpdateWithoutPayoutsInput>, TenantUncheckedUpdateWithoutPayoutsInput>
  }

  export type TenantCreateNestedOneWithoutLedgerEntriesInput = {
    create?: XOR<TenantCreateWithoutLedgerEntriesInput, TenantUncheckedCreateWithoutLedgerEntriesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutLedgerEntriesInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutLedgerEntriesNestedInput = {
    create?: XOR<TenantCreateWithoutLedgerEntriesInput, TenantUncheckedCreateWithoutLedgerEntriesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutLedgerEntriesInput
    upsert?: TenantUpsertWithoutLedgerEntriesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutLedgerEntriesInput, TenantUpdateWithoutLedgerEntriesInput>, TenantUncheckedUpdateWithoutLedgerEntriesInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TenantCreateNestedOneWithoutCyclesInput = {
    create?: XOR<TenantCreateWithoutCyclesInput, TenantUncheckedCreateWithoutCyclesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutCyclesInput
    connect?: TenantWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutCyclesNestedInput = {
    create?: XOR<TenantCreateWithoutCyclesInput, TenantUncheckedCreateWithoutCyclesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutCyclesInput
    upsert?: TenantUpsertWithoutCyclesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutCyclesInput, TenantUpdateWithoutCyclesInput>, TenantUncheckedUpdateWithoutCyclesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PlanCreateWithoutTenantsInput = {
    id?: string
    name: string
    gmvThreshold: bigint | number
    monthlyPrice: bigint | number
  }

  export type PlanUncheckedCreateWithoutTenantsInput = {
    id?: string
    name: string
    gmvThreshold: bigint | number
    monthlyPrice: bigint | number
  }

  export type PlanCreateOrConnectWithoutTenantsInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutTenantsInput, PlanUncheckedCreateWithoutTenantsInput>
  }

  export type UserCreateWithoutTenantInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutTenantInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutTenantInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
  }

  export type UserCreateManyTenantInputEnvelope = {
    data: UserCreateManyTenantInput | UserCreateManyTenantInput[]
  }

  export type ApiKeyCreateWithoutTenantInput = {
    id?: string
    name: string
    prefix: string
    keyHash: string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiKeyUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    prefix: string
    keyHash: string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ApiKeyCreateOrConnectWithoutTenantInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutTenantInput, ApiKeyUncheckedCreateWithoutTenantInput>
  }

  export type ApiKeyCreateManyTenantInputEnvelope = {
    data: ApiKeyCreateManyTenantInput | ApiKeyCreateManyTenantInput[]
  }

  export type PspCredentialCreateWithoutTenantInput = {
    id?: string
    provider: string
    encryptedKeys: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PspCredentialUncheckedCreateWithoutTenantInput = {
    id?: string
    provider: string
    encryptedKeys: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PspCredentialCreateOrConnectWithoutTenantInput = {
    where: PspCredentialWhereUniqueInput
    create: XOR<PspCredentialCreateWithoutTenantInput, PspCredentialUncheckedCreateWithoutTenantInput>
  }

  export type PspCredentialCreateManyTenantInputEnvelope = {
    data: PspCredentialCreateManyTenantInput | PspCredentialCreateManyTenantInput[]
  }

  export type PaymentIntentCreateWithoutTenantInput = {
    id?: string
    provider: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    metadata?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentIntentUncheckedCreateWithoutTenantInput = {
    id?: string
    provider: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    metadata?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentIntentCreateOrConnectWithoutTenantInput = {
    where: PaymentIntentWhereUniqueInput
    create: XOR<PaymentIntentCreateWithoutTenantInput, PaymentIntentUncheckedCreateWithoutTenantInput>
  }

  export type PaymentIntentCreateManyTenantInputEnvelope = {
    data: PaymentIntentCreateManyTenantInput | PaymentIntentCreateManyTenantInput[]
  }

  export type PayoutCreateWithoutTenantInput = {
    id?: string
    provider: string
    payeeRef: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    createdByUserId?: string | null
    approvedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PayoutUncheckedCreateWithoutTenantInput = {
    id?: string
    provider: string
    payeeRef: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    createdByUserId?: string | null
    approvedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PayoutCreateOrConnectWithoutTenantInput = {
    where: PayoutWhereUniqueInput
    create: XOR<PayoutCreateWithoutTenantInput, PayoutUncheckedCreateWithoutTenantInput>
  }

  export type PayoutCreateManyTenantInputEnvelope = {
    data: PayoutCreateManyTenantInput | PayoutCreateManyTenantInput[]
  }

  export type LedgerEntryCreateWithoutTenantInput = {
    id?: string
    account: string
    debitCents?: bigint | number
    creditCents?: bigint | number
    refType?: string | null
    refId?: string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUncheckedCreateWithoutTenantInput = {
    id?: string
    account: string
    debitCents?: bigint | number
    creditCents?: bigint | number
    refType?: string | null
    refId?: string | null
    createdAt?: Date | string
  }

  export type LedgerEntryCreateOrConnectWithoutTenantInput = {
    where: LedgerEntryWhereUniqueInput
    create: XOR<LedgerEntryCreateWithoutTenantInput, LedgerEntryUncheckedCreateWithoutTenantInput>
  }

  export type LedgerEntryCreateManyTenantInputEnvelope = {
    data: LedgerEntryCreateManyTenantInput | LedgerEntryCreateManyTenantInput[]
  }

  export type SubscriptionCycleCreateWithoutTenantInput = {
    id?: string
    periodStart: Date | string
    periodEnd: Date | string
    gmvSnapshot?: bigint | number
    tierApplied: string
    amountCents: bigint | number
    invoicedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SubscriptionCycleUncheckedCreateWithoutTenantInput = {
    id?: string
    periodStart: Date | string
    periodEnd: Date | string
    gmvSnapshot?: bigint | number
    tierApplied: string
    amountCents: bigint | number
    invoicedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SubscriptionCycleCreateOrConnectWithoutTenantInput = {
    where: SubscriptionCycleWhereUniqueInput
    create: XOR<SubscriptionCycleCreateWithoutTenantInput, SubscriptionCycleUncheckedCreateWithoutTenantInput>
  }

  export type SubscriptionCycleCreateManyTenantInputEnvelope = {
    data: SubscriptionCycleCreateManyTenantInput | SubscriptionCycleCreateManyTenantInput[]
  }

  export type PlanUpsertWithoutTenantsInput = {
    update: XOR<PlanUpdateWithoutTenantsInput, PlanUncheckedUpdateWithoutTenantsInput>
    create: XOR<PlanCreateWithoutTenantsInput, PlanUncheckedCreateWithoutTenantsInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutTenantsInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutTenantsInput, PlanUncheckedUpdateWithoutTenantsInput>
  }

  export type PlanUpdateWithoutTenantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gmvThreshold?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyPrice?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PlanUncheckedUpdateWithoutTenantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gmvThreshold?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyPrice?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UserUpsertWithWhereUniqueWithoutTenantInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutTenantInput, UserUncheckedUpdateWithoutTenantInput>
    create: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
  }

  export type UserUpdateWithWhereUniqueWithoutTenantInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutTenantInput, UserUncheckedUpdateWithoutTenantInput>
  }

  export type UserUpdateManyWithWhereWithoutTenantInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutTenantInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    tenantId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type ApiKeyUpsertWithWhereUniqueWithoutTenantInput = {
    where: ApiKeyWhereUniqueInput
    update: XOR<ApiKeyUpdateWithoutTenantInput, ApiKeyUncheckedUpdateWithoutTenantInput>
    create: XOR<ApiKeyCreateWithoutTenantInput, ApiKeyUncheckedCreateWithoutTenantInput>
  }

  export type ApiKeyUpdateWithWhereUniqueWithoutTenantInput = {
    where: ApiKeyWhereUniqueInput
    data: XOR<ApiKeyUpdateWithoutTenantInput, ApiKeyUncheckedUpdateWithoutTenantInput>
  }

  export type ApiKeyUpdateManyWithWhereWithoutTenantInput = {
    where: ApiKeyScalarWhereInput
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyWithoutTenantInput>
  }

  export type ApiKeyScalarWhereInput = {
    AND?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    OR?: ApiKeyScalarWhereInput[]
    NOT?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    tenantId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    prefix?: StringFilter<"ApiKey"> | string
    keyHash?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
  }

  export type PspCredentialUpsertWithWhereUniqueWithoutTenantInput = {
    where: PspCredentialWhereUniqueInput
    update: XOR<PspCredentialUpdateWithoutTenantInput, PspCredentialUncheckedUpdateWithoutTenantInput>
    create: XOR<PspCredentialCreateWithoutTenantInput, PspCredentialUncheckedCreateWithoutTenantInput>
  }

  export type PspCredentialUpdateWithWhereUniqueWithoutTenantInput = {
    where: PspCredentialWhereUniqueInput
    data: XOR<PspCredentialUpdateWithoutTenantInput, PspCredentialUncheckedUpdateWithoutTenantInput>
  }

  export type PspCredentialUpdateManyWithWhereWithoutTenantInput = {
    where: PspCredentialScalarWhereInput
    data: XOR<PspCredentialUpdateManyMutationInput, PspCredentialUncheckedUpdateManyWithoutTenantInput>
  }

  export type PspCredentialScalarWhereInput = {
    AND?: PspCredentialScalarWhereInput | PspCredentialScalarWhereInput[]
    OR?: PspCredentialScalarWhereInput[]
    NOT?: PspCredentialScalarWhereInput | PspCredentialScalarWhereInput[]
    id?: StringFilter<"PspCredential"> | string
    tenantId?: StringFilter<"PspCredential"> | string
    provider?: StringFilter<"PspCredential"> | string
    encryptedKeys?: StringFilter<"PspCredential"> | string
    createdAt?: DateTimeFilter<"PspCredential"> | Date | string
    updatedAt?: DateTimeFilter<"PspCredential"> | Date | string
  }

  export type PaymentIntentUpsertWithWhereUniqueWithoutTenantInput = {
    where: PaymentIntentWhereUniqueInput
    update: XOR<PaymentIntentUpdateWithoutTenantInput, PaymentIntentUncheckedUpdateWithoutTenantInput>
    create: XOR<PaymentIntentCreateWithoutTenantInput, PaymentIntentUncheckedCreateWithoutTenantInput>
  }

  export type PaymentIntentUpdateWithWhereUniqueWithoutTenantInput = {
    where: PaymentIntentWhereUniqueInput
    data: XOR<PaymentIntentUpdateWithoutTenantInput, PaymentIntentUncheckedUpdateWithoutTenantInput>
  }

  export type PaymentIntentUpdateManyWithWhereWithoutTenantInput = {
    where: PaymentIntentScalarWhereInput
    data: XOR<PaymentIntentUpdateManyMutationInput, PaymentIntentUncheckedUpdateManyWithoutTenantInput>
  }

  export type PaymentIntentScalarWhereInput = {
    AND?: PaymentIntentScalarWhereInput | PaymentIntentScalarWhereInput[]
    OR?: PaymentIntentScalarWhereInput[]
    NOT?: PaymentIntentScalarWhereInput | PaymentIntentScalarWhereInput[]
    id?: StringFilter<"PaymentIntent"> | string
    tenantId?: StringFilter<"PaymentIntent"> | string
    provider?: StringFilter<"PaymentIntent"> | string
    amountCents?: BigIntFilter<"PaymentIntent"> | bigint | number
    currency?: StringFilter<"PaymentIntent"> | string
    status?: StringFilter<"PaymentIntent"> | string
    idempotencyKey?: StringFilter<"PaymentIntent"> | string
    externalRef?: StringNullableFilter<"PaymentIntent"> | string | null
    metadata?: StringNullableFilter<"PaymentIntent"> | string | null
    expiresAt?: DateTimeNullableFilter<"PaymentIntent"> | Date | string | null
    createdAt?: DateTimeFilter<"PaymentIntent"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentIntent"> | Date | string
  }

  export type PayoutUpsertWithWhereUniqueWithoutTenantInput = {
    where: PayoutWhereUniqueInput
    update: XOR<PayoutUpdateWithoutTenantInput, PayoutUncheckedUpdateWithoutTenantInput>
    create: XOR<PayoutCreateWithoutTenantInput, PayoutUncheckedCreateWithoutTenantInput>
  }

  export type PayoutUpdateWithWhereUniqueWithoutTenantInput = {
    where: PayoutWhereUniqueInput
    data: XOR<PayoutUpdateWithoutTenantInput, PayoutUncheckedUpdateWithoutTenantInput>
  }

  export type PayoutUpdateManyWithWhereWithoutTenantInput = {
    where: PayoutScalarWhereInput
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyWithoutTenantInput>
  }

  export type PayoutScalarWhereInput = {
    AND?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
    OR?: PayoutScalarWhereInput[]
    NOT?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
    id?: StringFilter<"Payout"> | string
    tenantId?: StringFilter<"Payout"> | string
    provider?: StringFilter<"Payout"> | string
    payeeRef?: StringFilter<"Payout"> | string
    amountCents?: BigIntFilter<"Payout"> | bigint | number
    currency?: StringFilter<"Payout"> | string
    status?: StringFilter<"Payout"> | string
    idempotencyKey?: StringFilter<"Payout"> | string
    externalRef?: StringNullableFilter<"Payout"> | string | null
    createdByUserId?: StringNullableFilter<"Payout"> | string | null
    approvedById?: StringNullableFilter<"Payout"> | string | null
    createdAt?: DateTimeFilter<"Payout"> | Date | string
    updatedAt?: DateTimeFilter<"Payout"> | Date | string
  }

  export type LedgerEntryUpsertWithWhereUniqueWithoutTenantInput = {
    where: LedgerEntryWhereUniqueInput
    update: XOR<LedgerEntryUpdateWithoutTenantInput, LedgerEntryUncheckedUpdateWithoutTenantInput>
    create: XOR<LedgerEntryCreateWithoutTenantInput, LedgerEntryUncheckedCreateWithoutTenantInput>
  }

  export type LedgerEntryUpdateWithWhereUniqueWithoutTenantInput = {
    where: LedgerEntryWhereUniqueInput
    data: XOR<LedgerEntryUpdateWithoutTenantInput, LedgerEntryUncheckedUpdateWithoutTenantInput>
  }

  export type LedgerEntryUpdateManyWithWhereWithoutTenantInput = {
    where: LedgerEntryScalarWhereInput
    data: XOR<LedgerEntryUpdateManyMutationInput, LedgerEntryUncheckedUpdateManyWithoutTenantInput>
  }

  export type LedgerEntryScalarWhereInput = {
    AND?: LedgerEntryScalarWhereInput | LedgerEntryScalarWhereInput[]
    OR?: LedgerEntryScalarWhereInput[]
    NOT?: LedgerEntryScalarWhereInput | LedgerEntryScalarWhereInput[]
    id?: StringFilter<"LedgerEntry"> | string
    tenantId?: StringFilter<"LedgerEntry"> | string
    account?: StringFilter<"LedgerEntry"> | string
    debitCents?: BigIntFilter<"LedgerEntry"> | bigint | number
    creditCents?: BigIntFilter<"LedgerEntry"> | bigint | number
    refType?: StringNullableFilter<"LedgerEntry"> | string | null
    refId?: StringNullableFilter<"LedgerEntry"> | string | null
    createdAt?: DateTimeFilter<"LedgerEntry"> | Date | string
  }

  export type SubscriptionCycleUpsertWithWhereUniqueWithoutTenantInput = {
    where: SubscriptionCycleWhereUniqueInput
    update: XOR<SubscriptionCycleUpdateWithoutTenantInput, SubscriptionCycleUncheckedUpdateWithoutTenantInput>
    create: XOR<SubscriptionCycleCreateWithoutTenantInput, SubscriptionCycleUncheckedCreateWithoutTenantInput>
  }

  export type SubscriptionCycleUpdateWithWhereUniqueWithoutTenantInput = {
    where: SubscriptionCycleWhereUniqueInput
    data: XOR<SubscriptionCycleUpdateWithoutTenantInput, SubscriptionCycleUncheckedUpdateWithoutTenantInput>
  }

  export type SubscriptionCycleUpdateManyWithWhereWithoutTenantInput = {
    where: SubscriptionCycleScalarWhereInput
    data: XOR<SubscriptionCycleUpdateManyMutationInput, SubscriptionCycleUncheckedUpdateManyWithoutTenantInput>
  }

  export type SubscriptionCycleScalarWhereInput = {
    AND?: SubscriptionCycleScalarWhereInput | SubscriptionCycleScalarWhereInput[]
    OR?: SubscriptionCycleScalarWhereInput[]
    NOT?: SubscriptionCycleScalarWhereInput | SubscriptionCycleScalarWhereInput[]
    id?: StringFilter<"SubscriptionCycle"> | string
    tenantId?: StringFilter<"SubscriptionCycle"> | string
    periodStart?: DateTimeFilter<"SubscriptionCycle"> | Date | string
    periodEnd?: DateTimeFilter<"SubscriptionCycle"> | Date | string
    gmvSnapshot?: BigIntFilter<"SubscriptionCycle"> | bigint | number
    tierApplied?: StringFilter<"SubscriptionCycle"> | string
    amountCents?: BigIntFilter<"SubscriptionCycle"> | bigint | number
    invoicedAt?: DateTimeNullableFilter<"SubscriptionCycle"> | Date | string | null
    createdAt?: DateTimeFilter<"SubscriptionCycle"> | Date | string
  }

  export type TenantCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan?: PlanCreateNestedOneWithoutTenantsInput
    apiKeys?: ApiKeyCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentCreateNestedManyWithoutTenantInput
    payouts?: PayoutCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    planId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialUncheckedCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentUncheckedCreateNestedManyWithoutTenantInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutUsersInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
  }

  export type TenantUpsertWithoutUsersInput = {
    update: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutUsersInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>
  }

  export type TenantUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneWithoutTenantsNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUncheckedUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUncheckedUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateWithoutPlanInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentCreateNestedManyWithoutTenantInput
    payouts?: PayoutCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutPlanInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialUncheckedCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentUncheckedCreateNestedManyWithoutTenantInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutPlanInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutPlanInput, TenantUncheckedCreateWithoutPlanInput>
  }

  export type TenantCreateManyPlanInputEnvelope = {
    data: TenantCreateManyPlanInput | TenantCreateManyPlanInput[]
  }

  export type TenantUpsertWithWhereUniqueWithoutPlanInput = {
    where: TenantWhereUniqueInput
    update: XOR<TenantUpdateWithoutPlanInput, TenantUncheckedUpdateWithoutPlanInput>
    create: XOR<TenantCreateWithoutPlanInput, TenantUncheckedCreateWithoutPlanInput>
  }

  export type TenantUpdateWithWhereUniqueWithoutPlanInput = {
    where: TenantWhereUniqueInput
    data: XOR<TenantUpdateWithoutPlanInput, TenantUncheckedUpdateWithoutPlanInput>
  }

  export type TenantUpdateManyWithWhereWithoutPlanInput = {
    where: TenantScalarWhereInput
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyWithoutPlanInput>
  }

  export type TenantScalarWhereInput = {
    AND?: TenantScalarWhereInput | TenantScalarWhereInput[]
    OR?: TenantScalarWhereInput[]
    NOT?: TenantScalarWhereInput | TenantScalarWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    slug?: StringFilter<"Tenant"> | string
    status?: StringFilter<"Tenant"> | string
    kycStatus?: StringFilter<"Tenant"> | string
    planId?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
  }

  export type TenantCreateWithoutApiKeysInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan?: PlanCreateNestedOneWithoutTenantsInput
    users?: UserCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentCreateNestedManyWithoutTenantInput
    payouts?: PayoutCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutApiKeysInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    planId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialUncheckedCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentUncheckedCreateNestedManyWithoutTenantInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutApiKeysInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutApiKeysInput, TenantUncheckedCreateWithoutApiKeysInput>
  }

  export type TenantUpsertWithoutApiKeysInput = {
    update: XOR<TenantUpdateWithoutApiKeysInput, TenantUncheckedUpdateWithoutApiKeysInput>
    create: XOR<TenantCreateWithoutApiKeysInput, TenantUncheckedCreateWithoutApiKeysInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutApiKeysInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutApiKeysInput, TenantUncheckedUpdateWithoutApiKeysInput>
  }

  export type TenantUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneWithoutTenantsNestedInput
    users?: UserUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUncheckedUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUncheckedUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateWithoutCredentialsInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan?: PlanCreateNestedOneWithoutTenantsInput
    users?: UserCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentCreateNestedManyWithoutTenantInput
    payouts?: PayoutCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutCredentialsInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    planId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentUncheckedCreateNestedManyWithoutTenantInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutCredentialsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutCredentialsInput, TenantUncheckedCreateWithoutCredentialsInput>
  }

  export type TenantUpsertWithoutCredentialsInput = {
    update: XOR<TenantUpdateWithoutCredentialsInput, TenantUncheckedUpdateWithoutCredentialsInput>
    create: XOR<TenantCreateWithoutCredentialsInput, TenantUncheckedCreateWithoutCredentialsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutCredentialsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutCredentialsInput, TenantUncheckedUpdateWithoutCredentialsInput>
  }

  export type TenantUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneWithoutTenantsNestedInput
    users?: UserUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUncheckedUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateWithoutIntentsInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan?: PlanCreateNestedOneWithoutTenantsInput
    users?: UserCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialCreateNestedManyWithoutTenantInput
    payouts?: PayoutCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutIntentsInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    planId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialUncheckedCreateNestedManyWithoutTenantInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutIntentsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutIntentsInput, TenantUncheckedCreateWithoutIntentsInput>
  }

  export type TenantUpsertWithoutIntentsInput = {
    update: XOR<TenantUpdateWithoutIntentsInput, TenantUncheckedUpdateWithoutIntentsInput>
    create: XOR<TenantCreateWithoutIntentsInput, TenantUncheckedCreateWithoutIntentsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutIntentsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutIntentsInput, TenantUncheckedUpdateWithoutIntentsInput>
  }

  export type TenantUpdateWithoutIntentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneWithoutTenantsNestedInput
    users?: UserUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutIntentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUncheckedUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateWithoutPayoutsInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan?: PlanCreateNestedOneWithoutTenantsInput
    users?: UserCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutPayoutsInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    planId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialUncheckedCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentUncheckedCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutPayoutsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutPayoutsInput, TenantUncheckedCreateWithoutPayoutsInput>
  }

  export type TenantUpsertWithoutPayoutsInput = {
    update: XOR<TenantUpdateWithoutPayoutsInput, TenantUncheckedUpdateWithoutPayoutsInput>
    create: XOR<TenantCreateWithoutPayoutsInput, TenantUncheckedCreateWithoutPayoutsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutPayoutsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutPayoutsInput, TenantUncheckedUpdateWithoutPayoutsInput>
  }

  export type TenantUpdateWithoutPayoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneWithoutTenantsNestedInput
    users?: UserUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutPayoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUncheckedUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUncheckedUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateWithoutLedgerEntriesInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan?: PlanCreateNestedOneWithoutTenantsInput
    users?: UserCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentCreateNestedManyWithoutTenantInput
    payouts?: PayoutCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutLedgerEntriesInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    planId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialUncheckedCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentUncheckedCreateNestedManyWithoutTenantInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutTenantInput
    cycles?: SubscriptionCycleUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutLedgerEntriesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutLedgerEntriesInput, TenantUncheckedCreateWithoutLedgerEntriesInput>
  }

  export type TenantUpsertWithoutLedgerEntriesInput = {
    update: XOR<TenantUpdateWithoutLedgerEntriesInput, TenantUncheckedUpdateWithoutLedgerEntriesInput>
    create: XOR<TenantCreateWithoutLedgerEntriesInput, TenantUncheckedCreateWithoutLedgerEntriesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutLedgerEntriesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutLedgerEntriesInput, TenantUncheckedUpdateWithoutLedgerEntriesInput>
  }

  export type TenantUpdateWithoutLedgerEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneWithoutTenantsNestedInput
    users?: UserUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutLedgerEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUncheckedUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUncheckedUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateWithoutCyclesInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan?: PlanCreateNestedOneWithoutTenantsInput
    users?: UserCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentCreateNestedManyWithoutTenantInput
    payouts?: PayoutCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutCyclesInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    planId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutTenantInput
    credentials?: PspCredentialUncheckedCreateNestedManyWithoutTenantInput
    intents?: PaymentIntentUncheckedCreateNestedManyWithoutTenantInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutTenantInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutCyclesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutCyclesInput, TenantUncheckedCreateWithoutCyclesInput>
  }

  export type TenantUpsertWithoutCyclesInput = {
    update: XOR<TenantUpdateWithoutCyclesInput, TenantUncheckedUpdateWithoutCyclesInput>
    create: XOR<TenantCreateWithoutCyclesInput, TenantUncheckedCreateWithoutCyclesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutCyclesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutCyclesInput, TenantUncheckedUpdateWithoutCyclesInput>
  }

  export type TenantUpdateWithoutCyclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneWithoutTenantsNestedInput
    users?: UserUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutCyclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUncheckedUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUncheckedUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type UserCreateManyTenantInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type ApiKeyCreateManyTenantInput = {
    id?: string
    name: string
    prefix: string
    keyHash: string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PspCredentialCreateManyTenantInput = {
    id?: string
    provider: string
    encryptedKeys: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentIntentCreateManyTenantInput = {
    id?: string
    provider: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    metadata?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PayoutCreateManyTenantInput = {
    id?: string
    provider: string
    payeeRef: string
    amountCents: bigint | number
    currency: string
    status?: string
    idempotencyKey: string
    externalRef?: string | null
    createdByUserId?: string | null
    approvedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LedgerEntryCreateManyTenantInput = {
    id?: string
    account: string
    debitCents?: bigint | number
    creditCents?: bigint | number
    refType?: string | null
    refId?: string | null
    createdAt?: Date | string
  }

  export type SubscriptionCycleCreateManyTenantInput = {
    id?: string
    periodStart: Date | string
    periodEnd: Date | string
    gmvSnapshot?: bigint | number
    tierApplied: string
    amountCents: bigint | number
    invoicedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PspCredentialUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    encryptedKeys?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PspCredentialUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    encryptedKeys?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PspCredentialUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    encryptedKeys?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentIntentUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payeeRef?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payeeRef?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    payeeRef?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    externalRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    debitCents?: BigIntFieldUpdateOperationsInput | bigint | number
    creditCents?: BigIntFieldUpdateOperationsInput | bigint | number
    refType?: NullableStringFieldUpdateOperationsInput | string | null
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    debitCents?: BigIntFieldUpdateOperationsInput | bigint | number
    creditCents?: BigIntFieldUpdateOperationsInput | bigint | number
    refType?: NullableStringFieldUpdateOperationsInput | string | null
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    debitCents?: BigIntFieldUpdateOperationsInput | bigint | number
    creditCents?: BigIntFieldUpdateOperationsInput | bigint | number
    refType?: NullableStringFieldUpdateOperationsInput | string | null
    refId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCycleUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    gmvSnapshot?: BigIntFieldUpdateOperationsInput | bigint | number
    tierApplied?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    invoicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCycleUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    gmvSnapshot?: BigIntFieldUpdateOperationsInput | bigint | number
    tierApplied?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    invoicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCycleUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    gmvSnapshot?: BigIntFieldUpdateOperationsInput | bigint | number
    tierApplied?: StringFieldUpdateOperationsInput | string
    amountCents?: BigIntFieldUpdateOperationsInput | bigint | number
    invoicedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantCreateManyPlanInput = {
    id?: string
    name: string
    slug: string
    status?: string
    kycStatus?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutTenantNestedInput
    credentials?: PspCredentialUncheckedUpdateManyWithoutTenantNestedInput
    intents?: PaymentIntentUncheckedUpdateManyWithoutTenantNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutTenantNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutTenantNestedInput
    cycles?: SubscriptionCycleUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}