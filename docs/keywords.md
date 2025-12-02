# MIDL Language Reference

This document provides a comprehensive reference for Microsoft Interface Definition Language (MIDL) keywords, attributes, and types, with links to official Microsoft documentation.

**Base URL:** `https://learn.microsoft.com/en-us/windows/win32/Midl/`

---

## Keywords

### Declaration Keywords

| Keyword | Description | Documentation |
|---------|-------------|---------------|
| `interface` | Declares a COM interface | [interface](https://learn.microsoft.com/en-us/windows/win32/Midl/interface) |
| `coclass` | Declares a component class | [coclass](https://learn.microsoft.com/en-us/windows/win32/Midl/coclass) |
| `library` | Declares a type library | [library](https://learn.microsoft.com/en-us/windows/win32/Midl/library) |
| `dispinterface` | Declares a dispatch interface | [dispinterface](https://learn.microsoft.com/en-us/windows/win32/Midl/dispinterface) |
| `module` | Declares a module | [module](https://learn.microsoft.com/en-us/windows/win32/Midl/module) |
| `struct` | Declares a structure | [struct](https://learn.microsoft.com/en-us/windows/win32/Midl/struct) |
| `union` | Declares a union | [union](https://learn.microsoft.com/en-us/windows/win32/Midl/union) |
| `enum` | Declares an enumeration | [enum](https://learn.microsoft.com/en-us/windows/win32/Midl/enum) |
| `typedef` | Creates a type alias | [typedef](https://learn.microsoft.com/en-us/windows/win32/Midl/typedef) |

### Control Keywords

| Keyword | Description | Documentation |
|---------|-------------|---------------|
| `import` | Imports IDL files | [import](https://learn.microsoft.com/en-us/windows/win32/Midl/import) |
| `importlib` | Imports a type library | [importlib](https://learn.microsoft.com/en-us/windows/win32/Midl/importlib) |
| `include` | Includes header files | [include](https://learn.microsoft.com/en-us/windows/win32/Midl/include) |
| `cpp_quote` | Inserts C/C++ code | [cpp_quote](https://learn.microsoft.com/en-us/windows/win32/Midl/cpp-quote) |
| `midl_pragma` | Compiler directive | [midl_pragma](https://learn.microsoft.com/en-us/windows/win32/Midl/midl-pragma-warning) |
| `declare_guid` | Declares a GUID constant | [declare_guid](https://learn.microsoft.com/en-us/windows/win32/Midl/declare-guid) |

---

## Attributes

### Interface Header Attributes

| Attribute | Description | Documentation |
|-----------|-------------|---------------|
| `object` | Identifies a COM interface | [object](https://learn.microsoft.com/en-us/windows/win32/Midl/object) |
| `uuid` | Specifies the interface/class identifier | [uuid](https://learn.microsoft.com/en-us/windows/win32/Midl/uuid) |
| `local` | Indicates methods are not remoted | [local](https://learn.microsoft.com/en-us/windows/win32/Midl/local) |
| `async_uuid` | UUID for async interface | [async_uuid](https://learn.microsoft.com/en-us/windows/win32/Midl/async-uuid) |
| `version` | Interface version | [version](https://learn.microsoft.com/en-us/windows/win32/Midl/version) |
| `pointer_default` | Default pointer type | [pointer_default](https://learn.microsoft.com/en-us/windows/win32/Midl/pointer-default) |
| `endpoint` | RPC endpoint specification | [endpoint](https://learn.microsoft.com/en-us/windows/win32/Midl/endpoint) |
| `ms_union` | Microsoft union encoding | [ms_union](https://learn.microsoft.com/en-us/windows/win32/Midl/ms-union-attrib) |

### Directional Attributes

| Attribute | Description | Documentation |
|-----------|-------------|---------------|
| `in` | Input parameter | [in](https://learn.microsoft.com/en-us/windows/win32/Midl/in) |
| `out` | Output parameter | [out](https://learn.microsoft.com/en-us/windows/win32/Midl/out-idl) |
| `retval` | Return value parameter | [retval](https://learn.microsoft.com/en-us/windows/win32/Midl/retval) |

### Pointer Type Attributes

| Attribute | Description | Documentation |
|-----------|-------------|---------------|
| `ptr` | Full pointer | [ptr](https://learn.microsoft.com/en-us/windows/win32/Midl/ptr) |
| `ref` | Reference pointer | [ref](https://learn.microsoft.com/en-us/windows/win32/Midl/ref) |
| `unique` | Unique pointer | [unique](https://learn.microsoft.com/en-us/windows/win32/Midl/unique) |
| `string` | String pointer | [string](https://learn.microsoft.com/en-us/windows/win32/Midl/string) |
| `iid_is` | Interface ID for IUnknown* | [iid_is](https://learn.microsoft.com/en-us/windows/win32/Midl/iid-is) |

### Array and Sized-Pointer Attributes

| Attribute | Description | Documentation |
|-----------|-------------|---------------|
| `size_is` | Array size | [size_is](https://learn.microsoft.com/en-us/windows/win32/Midl/size-is) |
| `max_is` | Maximum array index | [max_is](https://learn.microsoft.com/en-us/windows/win32/Midl/max-is) |
| `length_is` | Number of transmitted elements | [length_is](https://learn.microsoft.com/en-us/windows/win32/Midl/length-is) |
| `first_is` | First transmitted element | [first_is](https://learn.microsoft.com/en-us/windows/win32/Midl/first-is) |
| `last_is` | Last transmitted element | [last_is](https://learn.microsoft.com/en-us/windows/win32/Midl/last-is) |
| `min_is` | Minimum array index | [min_is](https://learn.microsoft.com/en-us/windows/win32/Midl/min-is) |
| `range` | Value range constraint | [range](https://learn.microsoft.com/en-us/windows/win32/Midl/range) |

### Type Library Attributes

| Attribute | Description | Documentation |
|-----------|-------------|---------------|
| `aggregatable` | Class can be aggregated | [aggregatable](https://learn.microsoft.com/en-us/windows/win32/Midl/aggregatable) |
| `appobject` | Application object | [appobject](https://learn.microsoft.com/en-us/windows/win32/Midl/appobject) |
| `bindable` | Property supports binding | [bindable](https://learn.microsoft.com/en-us/windows/win32/Midl/bindable) |
| `control` | OLE control | [control](https://learn.microsoft.com/en-us/windows/win32/Midl/control) |
| `custom` | Custom attribute | [custom](https://learn.microsoft.com/en-us/windows/win32/Midl/custom) |
| `default` | Default interface | [default](https://learn.microsoft.com/en-us/windows/win32/Midl/default) |
| `defaultbind` | Default bindable property | [defaultbind](https://learn.microsoft.com/en-us/windows/win32/Midl/defaultbind) |
| `defaultcollelem` | Default collection element | [defaultcollelem](https://learn.microsoft.com/en-us/windows/win32/Midl/defaultcollelem) |
| `defaultvalue` | Default parameter value | [defaultvalue](https://learn.microsoft.com/en-us/windows/win32/Midl/defaultvalue) |
| `defaultvtable` | Default vtable interface | [defaultvtable](https://learn.microsoft.com/en-us/windows/win32/Midl/defaultvtable) |
| `displaybind` | Displayable bindable | [displaybind](https://learn.microsoft.com/en-us/windows/win32/Midl/displaybind) |
| `dllname` | DLL name for module | [dllname](https://learn.microsoft.com/en-us/windows/win32/Midl/dllname) |
| `dual` | Dual interface | [dual](https://learn.microsoft.com/en-us/windows/win32/Midl/dual) |
| `entry` | DLL entry point | [entry](https://learn.microsoft.com/en-us/windows/win32/Midl/entry) |
| `helpcontext` | Help context ID | [helpcontext](https://learn.microsoft.com/en-us/windows/win32/Midl/helpcontext) |
| `helpfile` | Help file name | [helpfile](https://learn.microsoft.com/en-us/windows/win32/Midl/helpfile) |
| `helpstring` | Help string | [helpstring](https://learn.microsoft.com/en-us/windows/win32/Midl/helpstring) |
| `helpstringcontext` | Help string context | [helpstringcontext](https://learn.microsoft.com/en-us/windows/win32/Midl/helpstringcontext) |
| `helpstringdll` | Help string DLL | [helpstringdll](https://learn.microsoft.com/en-us/windows/win32/Midl/helpstringdll) |
| `hidden` | Hidden from browsers | [hidden](https://learn.microsoft.com/en-us/windows/win32/Midl/hidden) |
| `id` | DISPID for member | [id](https://learn.microsoft.com/en-us/windows/win32/Midl/id) |
| `immediatebind` | Immediate binding | [immediatebind](https://learn.microsoft.com/en-us/windows/win32/Midl/immediatebind) |
| `lcid` | Locale ID | [lcid](https://learn.microsoft.com/en-us/windows/win32/Midl/lcid) |
| `licensed` | Licensed component | [licensed](https://learn.microsoft.com/en-us/windows/win32/Midl/licensed) |
| `nonbrowsable` | Not browsable | [nonbrowsable](https://learn.microsoft.com/en-us/windows/win32/Midl/nonbrowsable) |
| `noncreatable` | Not directly creatable | [noncreatable](https://learn.microsoft.com/en-us/windows/win32/Midl/noncreatable) |
| `nonextensible` | No additional methods | [nonextensible](https://learn.microsoft.com/en-us/windows/win32/Midl/nonextensible) |
| `oleautomation` | Automation compatible | [oleautomation](https://learn.microsoft.com/en-us/windows/win32/Midl/oleautomation) |
| `optional` | Optional parameter | [optional](https://learn.microsoft.com/en-us/windows/win32/Midl/optional) |
| `propget` | Property getter | [propget](https://learn.microsoft.com/en-us/windows/win32/Midl/propget) |
| `propput` | Property setter | [propput](https://learn.microsoft.com/en-us/windows/win32/Midl/propput) |
| `propputref` | Property reference setter | [propputref](https://learn.microsoft.com/en-us/windows/win32/Midl/propputref) |
| `public` | Public type | [public](https://learn.microsoft.com/en-us/windows/win32/Midl/public) |
| `readonly` | Read-only property | [readonly](https://learn.microsoft.com/en-us/windows/win32/Midl/readonly) |
| `requestedit` | Request edit notification | [requestedit](https://learn.microsoft.com/en-us/windows/win32/Midl/requestedit) |
| `restricted` | Restricted access | [restricted](https://learn.microsoft.com/en-us/windows/win32/Midl/restricted) |
| `source` | Event source | [source](https://learn.microsoft.com/en-us/windows/win32/Midl/source) |
| `uidefault` | User interface default | [uidefault](https://learn.microsoft.com/en-us/windows/win32/Midl/uidefault) |
| `usesgetlasterror` | Uses GetLastError | [usesgetlasterror](https://learn.microsoft.com/en-us/windows/win32/Midl/usesgetlasterror) |
| `vararg` | Variable arguments | [vararg](https://learn.microsoft.com/en-us/windows/win32/Midl/vararg) |

### Function Call Attributes

| Attribute | Description | Documentation |
|-----------|-------------|---------------|
| `async` | Asynchronous call | [async](https://learn.microsoft.com/en-us/windows/win32/Midl/async) |
| `broadcast` | Broadcast call | [broadcast](https://learn.microsoft.com/en-us/windows/win32/Midl/broadcast) |
| `callback` | Client callback | [callback](https://learn.microsoft.com/en-us/windows/win32/Midl/callback) |
| `call_as` | Remoting alias | [call_as](https://learn.microsoft.com/en-us/windows/win32/Midl/call-as) |
| `idempotent` | Idempotent operation | [idempotent](https://learn.microsoft.com/en-us/windows/win32/Midl/idempotent) |
| `maybe` | Maybe semantics | [maybe](https://learn.microsoft.com/en-us/windows/win32/Midl/maybe) |
| `message` | Message-based call | [message](https://learn.microsoft.com/en-us/windows/win32/Midl/message) |

### Marshaling Attributes

| Attribute | Description | Documentation |
|-----------|-------------|---------------|
| `context_handle` | Context handle type | [context_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/context-handle) |
| `handle` | Binding handle | [handle](https://learn.microsoft.com/en-us/windows/win32/Midl/handle) |
| `transmit_as` | Wire transmission type | [transmit_as](https://learn.microsoft.com/en-us/windows/win32/Midl/transmit-as) |
| `wire_marshal` | Wire format | [wire_marshal](https://learn.microsoft.com/en-us/windows/win32/Midl/wire-marshal) |
| `user_marshal` | Custom marshaling | [user_marshal](https://learn.microsoft.com/en-us/windows/win32/Midl/user-marshal) |
| `represent_as` | Local representation | [represent_as](https://learn.microsoft.com/en-us/windows/win32/Midl/represent-as) |
| `v1_enum` | 32-bit enum encoding | [v1_enum](https://learn.microsoft.com/en-us/windows/win32/Midl/v1-enum) |

### Structure and Union Attributes

| Attribute | Description | Documentation |
|-----------|-------------|---------------|
| `switch` | Discriminator for union | [switch](https://learn.microsoft.com/en-us/windows/win32/Midl/switch) |
| `switch_is` | Union discriminant | [switch_is](https://learn.microsoft.com/en-us/windows/win32/Midl/switch-is) |
| `switch_type` | Discriminant type | [switch_type](https://learn.microsoft.com/en-us/windows/win32/Midl/switch-type) |
| `ignore` | Ignored pointer | [ignore](https://learn.microsoft.com/en-us/windows/win32/Midl/ignore) |
| `partial_ignore` | Partially ignored | [partial_ignore](https://learn.microsoft.com/en-us/windows/win32/Midl/partial-ignore) |

### ACF/Binding Attributes

| Attribute | Description | Documentation |
|-----------|-------------|---------------|
| `auto_handle` | Automatic handle | [auto_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/auto-handle) |
| `explicit_handle` | Explicit handle | [explicit_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/explicit-handle) |
| `implicit_handle` | Implicit handle | [implicit_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/implicit-handle) |
| `context_handle_noserialize` | No serialization | [context_handle_noserialize](https://learn.microsoft.com/en-us/windows/win32/Midl/context-handle-noserialize) |
| `context_handle_serialize` | Serialized access | [context_handle_serialize](https://learn.microsoft.com/en-us/windows/win32/Midl/context-handle-serialize) |
| `strict_context_handle` | Strict context handle | [strict_context_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/strict-context-handle) |
| `allocate` | Memory allocation | [allocate](https://learn.microsoft.com/en-us/windows/win32/Midl/allocate) |
| `enable_allocate` | Enable allocation | [enable_allocate](https://learn.microsoft.com/en-us/windows/win32/Midl/enable-allocate) |
| `encode` | Pickling encode | [encode](https://learn.microsoft.com/en-us/windows/win32/Midl/encode) |
| `decode` | Pickling decode | [decode](https://learn.microsoft.com/en-us/windows/win32/Midl/decode) |
| `fault_status` | Fault status | [fault_status](https://learn.microsoft.com/en-us/windows/win32/Midl/fault-status) |
| `comm_status` | Communication status | [comm_status](https://learn.microsoft.com/en-us/windows/win32/Midl/comm-status) |
| `nocode` | Suppress stub code | [nocode](https://learn.microsoft.com/en-us/windows/win32/Midl/nocode) |
| `code` | Generate stub code | [code](https://learn.microsoft.com/en-us/windows/win32/Midl/code) |
| `notify` | Notification function | [notify](https://learn.microsoft.com/en-us/windows/win32/Midl/notify) |
| `notify_flag` | Notification flag | [notify_flag](https://learn.microsoft.com/en-us/windows/win32/Midl/notify-flag) |
| `optimize` | Stub optimization | [optimize](https://learn.microsoft.com/en-us/windows/win32/Midl/optimize) |

### System Handle Attributes

| Attribute | Description | Documentation |
|-----------|-------------|---------------|
| `system_handle` | System handle type | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_file` | File handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_pipe` | Pipe handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_socket` | Socket handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_process` | Process handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_thread` | Thread handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_event` | Event handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_mutex` | Mutex handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_semaphore` | Semaphore handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_token` | Token handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_section` | Section handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_reg_key` | Registry key handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_job` | Job handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |
| `sh_composition` | Composition handle | [system_handle](https://learn.microsoft.com/en-us/windows/win32/Midl/system-handle) |

---

## Data Types

### Primitive Types

| Type | Size | Description | Documentation |
|------|------|-------------|---------------|
| `boolean` | 8 bits | Boolean value | [boolean](https://learn.microsoft.com/en-us/windows/win32/Midl/boolean) |
| `byte` | 8 bits | Unsigned byte | [byte](https://learn.microsoft.com/en-us/windows/win32/Midl/byte) |
| `char` | 8 bits | Character | [char-idl](https://learn.microsoft.com/en-us/windows/win32/Midl/char-idl) |
| `small` | 8 bits | Small integer | [small](https://learn.microsoft.com/en-us/windows/win32/Midl/small) |
| `short` | 16 bits | Short integer | [short](https://learn.microsoft.com/en-us/windows/win32/Midl/short) |
| `int` | 32 bits | Integer | [int](https://learn.microsoft.com/en-us/windows/win32/Midl/int) |
| `long` | 32 bits | Long integer | [long](https://learn.microsoft.com/en-us/windows/win32/Midl/long) |
| `hyper` | 64 bits | 64-bit integer | [hyper](https://learn.microsoft.com/en-us/windows/win32/Midl/hyper) |
| `float` | 32 bits | Floating point | [float](https://learn.microsoft.com/en-us/windows/win32/Midl/float) |
| `double` | 64 bits | Double precision | [double](https://learn.microsoft.com/en-us/windows/win32/Midl/double) |
| `void` | - | No type | [void](https://learn.microsoft.com/en-us/windows/win32/Midl/void) |
| `wchar_t` | 16 bits | Wide character | [wchar-t](https://learn.microsoft.com/en-us/windows/win32/Midl/wchar-t) |
| `handle_t` | - | Primitive handle | [handle-t](https://learn.microsoft.com/en-us/windows/win32/Midl/handle-t) |
| `error_status_t` | 32 bits | Error status | [error-status-t](https://learn.microsoft.com/en-us/windows/win32/Midl/error-status-t) |

### Sized Integer Types

| Type | Size | Documentation |
|------|------|---------------|
| `__int8` | 8 bits | [--int8](https://learn.microsoft.com/en-us/windows/win32/Midl/--int8) |
| `__int16` | 16 bits | [--int16](https://learn.microsoft.com/en-us/windows/win32/Midl/--int16) |
| `__int32` | 32 bits | [--int32](https://learn.microsoft.com/en-us/windows/win32/Midl/--int32) |
| `__int3264` | 32/64 bits | [--int3264](https://learn.microsoft.com/en-us/windows/win32/Midl/--int3264) |
| `__int64` | 64 bits | [--int64](https://learn.microsoft.com/en-us/windows/win32/Midl/--int64) |

### COM/Automation Types

| Type | Description |
|------|-------------|
| `HRESULT` | Method return status |
| `SCODE` | Status code |
| `BSTR` | OLE Automation string |
| `VARIANT` | Variant data type |
| `SAFEARRAY` | Safe array |
| `VARIANT_BOOL` | Variant boolean |
| `CURRENCY` | Currency type |
| `DATE` | Date type |
| `DECIMAL` | Decimal type |

### Interface Types

| Type | Description |
|------|-------------|
| `IUnknown` | Base COM interface |
| `IDispatch` | Automation interface |
| `ITypeInfo` | Type information |
| `ITypeLib` | Type library |
| `IStream` | Stream interface |
| `IStorage` | Storage interface |
| `IMoniker` | Moniker interface |
| `IBindCtx` | Bind context |
| `IEnumVARIANT` | Variant enumerator |
| `IClassFactory` | Class factory |

### Type Modifiers

| Modifier | Description | Documentation |
|----------|-------------|---------------|
| `const` | Constant value | [const](https://learn.microsoft.com/en-us/windows/win32/Midl/const) |
| `signed` | Signed integer | [signed](https://learn.microsoft.com/en-us/windows/win32/Midl/signed) |
| `unsigned` | Unsigned integer | [unsigned](https://learn.microsoft.com/en-us/windows/win32/Midl/unsigned) |
| `volatile` | Volatile value | - |

---

## Constants

| Constant | Description |
|----------|-------------|
| `TRUE` | Boolean true |
| `FALSE` | Boolean false |
| `NULL` | Null pointer |

---

## Compiler Switches

For MIDL compiler command-line switches, see: [MIDL Command-Line Reference](https://learn.microsoft.com/en-us/windows/win32/Midl/midl-command-line-reference)

Common switches:

| Switch | Description | Documentation |
|--------|-------------|---------------|
| `/acf` | ACF file name | [-acf](https://learn.microsoft.com/en-us/windows/win32/Midl/-acf) |
| `/env` | Target environment | [-env](https://learn.microsoft.com/en-us/windows/win32/Midl/-env) |
| `/h` | Header file name | [-h](https://learn.microsoft.com/en-us/windows/win32/Midl/-h) |
| `/iid` | IID file name | [-iid](https://learn.microsoft.com/en-us/windows/win32/Midl/-iid) |
| `/proxy` | Proxy file name | [-proxy](https://learn.microsoft.com/en-us/windows/win32/Midl/-proxy) |
| `/tlb` | Type library file | [-tlb](https://learn.microsoft.com/en-us/windows/win32/Midl/-tlb) |
| `/win32` | 32-bit target | [-win32](https://learn.microsoft.com/en-us/windows/win32/Midl/-win32) |
| `/win64` | 64-bit target | [-win64](https://learn.microsoft.com/en-us/windows/win32/Midl/-win64) |
| `/Oicf` | Optimization level | [-oi](https://learn.microsoft.com/en-us/windows/win32/Midl/-oi) |

---

## See Also

- [MIDL Start Page](https://learn.microsoft.com/en-us/windows/win32/Midl/midl-start-page)
- [MIDL Language Reference](https://learn.microsoft.com/en-us/windows/win32/Midl/midl-language-reference)
- [Interface Definitions and Type Libraries](https://learn.microsoft.com/en-us/windows/win32/Midl/interface-definitions-and-type-libraries)
- [Anatomy of an IDL File](https://learn.microsoft.com/en-us/windows/win32/com/anatomy-of-an-idl-file)
