/**
 * MIDL Documentation Database
 * 
 * This file contains documentation entries for MIDL keywords, attributes, and types.
 * All URLs point to the official Microsoft documentation at learn.microsoft.com.
 */

const DOCS_BASE_URL = 'https://learn.microsoft.com/en-us/windows/win32/Midl';

export interface MidlDocEntry {
    name: string;
    category: 'keyword' | 'attribute' | 'type' | 'directive' | 'modifier';
    description: string;
    syntax?: string;
    example?: string;
    docUrl: string;
}

function createDocUrl(page: string): string {
    return `${DOCS_BASE_URL}/${page}`;
}

export const midlDocumentation: { [key: string]: MidlDocEntry } = {
    // ============================================
    // KEYWORDS
    // ============================================
    
    'interface': {
        name: 'interface',
        category: 'keyword',
        description: 'Declares a COM or RPC interface. COM interfaces must have the `[object]` attribute and derive from IUnknown. RPC interfaces define remote procedure calls.',
        syntax: '[attributes] interface interface-name [: base-interface] { ... }',
        example: `[object, uuid(12345678-1234-1234-1234-123456789ABC)]
interface IMyInterface : IUnknown
{
    HRESULT Method([in] long param);
};`,
        docUrl: createDocUrl('interface')
    },

    'coclass': {
        name: 'coclass',
        category: 'keyword',
        description: 'Declares a component class that implements one or more interfaces. The UUID becomes the CLSID used to instantiate the class with CoCreateInstance.',
        syntax: '[attributes] coclass classname { [interface-attrs] interface name; }',
        example: `[uuid(12345678-1234-1234-1234-123456789ABC)]
coclass MyClass
{
    [default] interface IMyInterface;
};`,
        docUrl: createDocUrl('coclass')
    },

    'library': {
        name: 'library',
        category: 'keyword',
        description: 'Declares a type library that contains definitions for interfaces, coclasses, and other type information. The library block generates a .tlb file.',
        syntax: '[uuid(...), version(...)] library name { ... }',
        example: `[uuid(12345678-1234-1234-1234-123456789ABC), version(1.0)]
library MyLib
{
    importlib("stdole32.tlb");
    interface IMyInterface;
    coclass MyClass { ... };
};`,
        docUrl: createDocUrl('library')
    },

    'dispinterface': {
        name: 'dispinterface',
        category: 'keyword',
        description: 'Declares an IDispatch-based interface for OLE Automation. Dispinterfaces are accessed through IDispatch::Invoke using DISPIDs.',
        syntax: 'dispinterface name { properties: ... methods: ... }',
        example: `[uuid(12345678-1234-1234-1234-123456789ABC)]
dispinterface DMyEvents
{
    properties:
        [id(1)] long Value;
    methods:
        [id(2)] void OnChange();
};`,
        docUrl: createDocUrl('dispinterface')
    },

    'module': {
        name: 'module',
        category: 'keyword',
        description: 'Declares a module containing DLL entry points for functions and constants. Requires the dllname attribute.',
        syntax: '[dllname("..."), uuid(...)] module name { ... }',
        example: `[dllname("math.dll"), uuid(12345678-1234-1234-1234-123456789ABC)]
module MathModule
{
    [entry("Add")] long Add([in] long a, [in] long b);
};`,
        docUrl: createDocUrl('module')
    },

    'struct': {
        name: 'struct',
        category: 'keyword',
        description: 'Declares a structure type. Structures can contain sized arrays using size_is, length_is, and other array attributes.',
        syntax: 'typedef struct [tag] { members... } NAME;',
        example: `typedef struct tagMY_STRUCT
{
    long count;
    [size_is(count)] byte* data;
} MY_STRUCT;`,
        docUrl: createDocUrl('struct')
    },

    'union': {
        name: 'union',
        category: 'keyword',
        description: 'Declares a discriminated union. Can be encapsulated (with switch) or non-encapsulated (with switch_type attribute).',
        syntax: 'union name switch (type discriminant) { case value: member; }',
        example: `typedef union switch (short type) data
{
    case 1: long intVal;
    case 2: double dblVal;
    default: ;
} MY_UNION;`,
        docUrl: createDocUrl('union')
    },

    'enum': {
        name: 'enum',
        category: 'keyword',
        description: 'Declares an enumeration type. By default, enums are transmitted as 16-bit values. Use v1_enum for 32-bit transmission.',
        syntax: 'typedef enum { VALUE1 = 0, VALUE2, ... } NAME;',
        example: `typedef enum
{
    STATE_IDLE = 0,
    STATE_RUNNING,
    STATE_STOPPED
} MY_STATE;`,
        docUrl: createDocUrl('enum')
    },

    'typedef': {
        name: 'typedef',
        category: 'keyword',
        description: 'Creates a type alias. Can include type attributes like string, context_handle, handle, etc.',
        syntax: 'typedef [attributes] type-specifier new-name;',
        example: `typedef [string] wchar_t* LPWSTR;
typedef [context_handle] void* MY_HANDLE;`,
        docUrl: createDocUrl('typedef')
    },

    'import': {
        name: 'import',
        category: 'keyword',
        description: 'Imports definitions from another IDL file. Unlike #include, import only brings in type definitions, not preprocessor directives.',
        syntax: 'import "filename.idl";',
        example: `import "oaidl.idl";
import "ocidl.idl";`,
        docUrl: createDocUrl('import')
    },

    'importlib': {
        name: 'importlib',
        category: 'keyword',
        description: 'Imports a compiled type library (.tlb). Used inside library blocks to reference types from other libraries.',
        syntax: 'importlib("filename.tlb");',
        example: `library MyLib
{
    importlib("stdole32.tlb");
};`,
        docUrl: createDocUrl('importlib')
    },

    'cpp_quote': {
        name: 'cpp_quote',
        category: 'directive',
        description: 'Inserts a literal string into the generated header file. Used to add #include directives or other C/C++ code.',
        syntax: 'cpp_quote("string")',
        example: `cpp_quote("#include <windows.h>")
cpp_quote("#define VERSION 1")`,
        docUrl: createDocUrl('cpp-quote')
    },

    'midl_pragma': {
        name: 'midl_pragma',
        category: 'directive',
        description: 'MIDL compiler pragma directive for controlling compiler behavior such as warning suppression.',
        syntax: 'midl_pragma warning(disable: nnnn)',
        docUrl: createDocUrl('midl-pragma-warning')
    },

    // ============================================
    // INTERFACE ATTRIBUTES
    // ============================================

    'object': {
        name: 'object',
        category: 'attribute',
        description: 'Identifies a COM interface. Required for all COM interfaces. Causes the compiler to generate proxy/stub code instead of RPC stubs.',
        syntax: '[object]',
        example: `[object, uuid(...)]
interface IMyInterface : IUnknown { ... }`,
        docUrl: createDocUrl('object')
    },

    'uuid': {
        name: 'uuid',
        category: 'attribute',
        description: 'Specifies the universally unique identifier (UUID/GUID) for an interface, coclass, or library. Required for COM components.',
        syntax: 'uuid(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)',
        example: `[uuid(12345678-1234-1234-1234-123456789ABC)]`,
        docUrl: createDocUrl('uuid')
    },

    'local': {
        name: 'local',
        category: 'attribute',
        description: 'Indicates that the interface or function is not remoted and no proxy/stub code is generated. Used for interfaces that run only in-process.',
        syntax: '[local]',
        example: `[local, object, uuid(...)]
interface ILocalInterface : IUnknown { ... }`,
        docUrl: createDocUrl('local')
    },

    'dual': {
        name: 'dual',
        category: 'attribute',
        description: 'Creates a dual interface that supports both IDispatch (for scripting) and vtable binding (for C++). Must derive from IDispatch.',
        syntax: '[dual]',
        example: `[object, uuid(...), dual, oleautomation]
interface IMyDual : IDispatch { ... }`,
        docUrl: createDocUrl('dual')
    },

    'oleautomation': {
        name: 'oleautomation',
        category: 'attribute',
        description: 'Indicates the interface uses only Automation-compatible types. Required for interfaces that will be used from scripting languages.',
        syntax: '[oleautomation]',
        docUrl: createDocUrl('oleautomation')
    },

    'pointer_default': {
        name: 'pointer_default',
        category: 'attribute',
        description: 'Sets the default pointer type (ref, unique, or ptr) for all pointers in the interface that don\'t have explicit pointer attributes.',
        syntax: 'pointer_default(ref | unique | ptr)',
        example: `[object, uuid(...), pointer_default(unique)]
interface IMyInterface : IUnknown { ... }`,
        docUrl: createDocUrl('pointer-default')
    },

    'version': {
        name: 'version',
        category: 'attribute',
        description: 'Specifies the version number of an interface or type library in major.minor format.',
        syntax: 'version(major.minor)',
        example: `[uuid(...), version(1.0)]
library MyLib { ... }`,
        docUrl: createDocUrl('version')
    },

    'async_uuid': {
        name: 'async_uuid',
        category: 'attribute',
        description: 'Specifies the UUID for the asynchronous version of an interface. Used with the async attribute on methods.',
        syntax: 'async_uuid(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)',
        docUrl: createDocUrl('async-uuid')
    },

    'endpoint': {
        name: 'endpoint',
        category: 'attribute',
        description: 'Specifies the RPC endpoint(s) for an interface. Defines the protocol sequence and endpoint name.',
        syntax: 'endpoint("protocol:[endpoint]")',
        example: `[uuid(...), endpoint("ncalrpc:[MyEndpoint]")]
interface IMyRpc { ... }`,
        docUrl: createDocUrl('endpoint')
    },

    // ============================================
    // DIRECTIONAL ATTRIBUTES
    // ============================================

    'in': {
        name: 'in',
        category: 'attribute',
        description: 'Indicates a parameter is passed from caller to callee. Data flows into the function. Required on all parameters.',
        syntax: '[in]',
        example: `HRESULT SetValue([in] long value);`,
        docUrl: createDocUrl('in')
    },

    'out': {
        name: 'out',
        category: 'attribute',
        description: 'Indicates a parameter is passed from callee back to caller. Requires a pointer type. Often combined with retval.',
        syntax: '[out]',
        example: `HRESULT GetValue([out] long* pValue);`,
        docUrl: createDocUrl('out-idl')
    },

    'retval': {
        name: 'retval',
        category: 'attribute',
        description: 'Marks the output parameter that contains the logical return value. In high-level languages, this becomes the function\'s return value.',
        syntax: '[out, retval]',
        example: `HRESULT GetName([out, retval] BSTR* pName);`,
        docUrl: createDocUrl('retval')
    },

    // ============================================
    // POINTER ATTRIBUTES
    // ============================================

    'ref': {
        name: 'ref',
        category: 'attribute',
        description: 'Reference pointer that cannot be null. Most efficient pointer type but cannot alias other pointers or be null.',
        syntax: '[ref]',
        docUrl: createDocUrl('ref')
    },

    'unique': {
        name: 'unique',
        category: 'attribute',
        description: 'Unique pointer that can be null but cannot alias other pointers. Default pointer type for most interfaces.',
        syntax: '[unique]',
        docUrl: createDocUrl('unique')
    },

    'ptr': {
        name: 'ptr',
        category: 'attribute',
        description: 'Full pointer that can be null and can alias other pointers. Most flexible but slowest pointer type.',
        syntax: '[ptr]',
        docUrl: createDocUrl('ptr')
    },

    'string': {
        name: 'string',
        category: 'attribute',
        description: 'Indicates the pointer points to a null-terminated string. The string length is determined at runtime.',
        syntax: '[string]',
        example: `HRESULT SetName([in, string] const wchar_t* name);`,
        docUrl: createDocUrl('string')
    },

    'iid_is': {
        name: 'iid_is',
        category: 'attribute',
        description: 'Specifies which parameter contains the IID for an interface pointer. Used with void* or IUnknown* parameters.',
        syntax: '[iid_is(param)]',
        example: `HRESULT QueryInterface([in] REFIID riid, [out, iid_is(riid)] void** ppv);`,
        docUrl: createDocUrl('iid-is')
    },

    // ============================================
    // ARRAY ATTRIBUTES
    // ============================================

    'size_is': {
        name: 'size_is',
        category: 'attribute',
        description: 'Specifies the total allocated size of an array or memory block. Used with conformant arrays.',
        syntax: '[size_is(expression)]',
        example: `HRESULT SendData([in] long count, [in, size_is(count)] byte* data);`,
        docUrl: createDocUrl('size-is')
    },

    'max_is': {
        name: 'max_is',
        category: 'attribute',
        description: 'Specifies the maximum valid index of an array. The array size is max_is + 1.',
        syntax: '[max_is(expression)]',
        example: `HRESULT ProcessItems([in] long maxIndex, [in, max_is(maxIndex)] long items[]);`,
        docUrl: createDocUrl('max-is')
    },

    'length_is': {
        name: 'length_is',
        category: 'attribute',
        description: 'Specifies the number of elements to transmit. Used for varying arrays where allocated size differs from transmitted size.',
        syntax: '[length_is(expression)]',
        example: `HRESULT SendPartial([in] long size, [in] long used, [in, size_is(size), length_is(used)] byte* data);`,
        docUrl: createDocUrl('length-is')
    },

    'first_is': {
        name: 'first_is',
        category: 'attribute',
        description: 'Specifies the index of the first array element to transmit.',
        syntax: '[first_is(expression)]',
        docUrl: createDocUrl('first-is')
    },

    'last_is': {
        name: 'last_is',
        category: 'attribute',
        description: 'Specifies the index of the last array element to transmit.',
        syntax: '[last_is(expression)]',
        docUrl: createDocUrl('last-is')
    },

    'range': {
        name: 'range',
        category: 'attribute',
        description: 'Specifies the valid range for a numeric value. Helps with security by validating parameters.',
        syntax: '[range(min, max)]',
        example: `HRESULT SetIndex([in, range(0, 100)] long index);`,
        docUrl: createDocUrl('range')
    },

    // ============================================
    // PROPERTY ATTRIBUTES
    // ============================================

    'propget': {
        name: 'propget',
        category: 'attribute',
        description: 'Marks a method as a property getter. The method retrieves the property value.',
        syntax: '[propget]',
        example: `[propget, id(1)] HRESULT Value([out, retval] long* pVal);`,
        docUrl: createDocUrl('propget')
    },

    'propput': {
        name: 'propput',
        category: 'attribute',
        description: 'Marks a method as a property setter for value types. The method sets the property value.',
        syntax: '[propput]',
        example: `[propput, id(1)] HRESULT Value([in] long newVal);`,
        docUrl: createDocUrl('propput')
    },

    'propputref': {
        name: 'propputref',
        category: 'attribute',
        description: 'Marks a method as a property setter for reference types (objects). Used when setting an object reference.',
        syntax: '[propputref]',
        example: `[propputref, id(2)] HRESULT Child([in] IChild* pChild);`,
        docUrl: createDocUrl('propputref')
    },

    // ============================================
    // TYPE LIBRARY ATTRIBUTES
    // ============================================

    'id': {
        name: 'id',
        category: 'attribute',
        description: 'Specifies the DISPID for a method or property. Required for dispinterface members.',
        syntax: '[id(dispid)]',
        example: `[id(1)] HRESULT Method1();
[propget, id(2)] HRESULT Value([out, retval] long* pVal);`,
        docUrl: createDocUrl('id')
    },

    'helpstring': {
        name: 'helpstring',
        category: 'attribute',
        description: 'Provides a human-readable description that appears in object browsers and documentation.',
        syntax: 'helpstring("description")',
        example: `[helpstring("Gets the current value")]
HRESULT GetValue([out, retval] long* pVal);`,
        docUrl: createDocUrl('helpstring')
    },

    'default': {
        name: 'default',
        category: 'attribute',
        description: 'Marks the default interface or source interface in a coclass.',
        syntax: '[default]',
        example: `coclass MyClass
{
    [default] interface IMyInterface;
    [default, source] dispinterface DMyEvents;
};`,
        docUrl: createDocUrl('default')
    },

    'source': {
        name: 'source',
        category: 'attribute',
        description: 'Marks an interface as an event source (outgoing interface). Used with connection points.',
        syntax: '[source]',
        example: `[default, source] dispinterface DMyEvents;`,
        docUrl: createDocUrl('source')
    },

    'hidden': {
        name: 'hidden',
        category: 'attribute',
        description: 'Hides the item from object browsers. The item still exists but is not visible to users.',
        syntax: '[hidden]',
        docUrl: createDocUrl('hidden')
    },

    'restricted': {
        name: 'restricted',
        category: 'attribute',
        description: 'Prevents the member from being called from macro languages like VBA.',
        syntax: '[restricted]',
        docUrl: createDocUrl('restricted')
    },

    'optional': {
        name: 'optional',
        category: 'attribute',
        description: 'Marks a parameter as optional. Used with VARIANT parameters that can be VT_ERROR with DISP_E_PARAMNOTFOUND.',
        syntax: '[optional]',
        docUrl: createDocUrl('optional')
    },

    'defaultvalue': {
        name: 'defaultvalue',
        category: 'attribute',
        description: 'Specifies the default value for an optional parameter.',
        syntax: '[defaultvalue(value)]',
        example: `HRESULT Method([in, defaultvalue(0)] long param);`,
        docUrl: createDocUrl('defaultvalue')
    },

    'vararg': {
        name: 'vararg',
        category: 'attribute',
        description: 'Indicates the method accepts a variable number of arguments. The last parameter must be a SAFEARRAY of VARIANT.',
        syntax: '[vararg]',
        docUrl: createDocUrl('vararg')
    },

    'bindable': {
        name: 'bindable',
        category: 'attribute',
        description: 'Indicates the property supports data binding and notifies clients of changes.',
        syntax: '[bindable]',
        docUrl: createDocUrl('bindable')
    },

    'requestedit': {
        name: 'requestedit',
        category: 'attribute',
        description: 'Indicates the property supports the OnRequestEdit notification before changes.',
        syntax: '[requestedit]',
        docUrl: createDocUrl('requestedit')
    },

    'displaybind': {
        name: 'displaybind',
        category: 'attribute',
        description: 'Indicates the property should be displayed as bindable in a property browser.',
        syntax: '[displaybind]',
        docUrl: createDocUrl('displaybind')
    },

    'defaultbind': {
        name: 'defaultbind',
        category: 'attribute',
        description: 'Indicates this is the default bindable property.',
        syntax: '[defaultbind]',
        docUrl: createDocUrl('defaultbind')
    },

    'immediatebind': {
        name: 'immediatebind',
        category: 'attribute',
        description: 'Indicates the database is notified immediately of property changes.',
        syntax: '[immediatebind]',
        docUrl: createDocUrl('immediatebind')
    },

    'aggregatable': {
        name: 'aggregatable',
        category: 'attribute',
        description: 'Indicates the coclass supports COM aggregation.',
        syntax: '[aggregatable]',
        docUrl: createDocUrl('aggregatable')
    },

    'appobject': {
        name: 'appobject',
        category: 'attribute',
        description: 'Identifies the coclass as an application object for full access to the type library.',
        syntax: '[appobject]',
        docUrl: createDocUrl('appobject')
    },

    'control': {
        name: 'control',
        category: 'attribute',
        description: 'Identifies the coclass as an ActiveX control.',
        syntax: '[control]',
        docUrl: createDocUrl('control')
    },

    'licensed': {
        name: 'licensed',
        category: 'attribute',
        description: 'Indicates the coclass requires licensing via IClassFactory2.',
        syntax: '[licensed]',
        docUrl: createDocUrl('licensed')
    },

    'noncreatable': {
        name: 'noncreatable',
        category: 'attribute',
        description: 'Indicates the coclass cannot be created directly with CoCreateInstance.',
        syntax: '[noncreatable]',
        docUrl: createDocUrl('noncreatable')
    },

    'nonextensible': {
        name: 'nonextensible',
        category: 'attribute',
        description: 'Indicates IDispatch does not support adding members dynamically.',
        syntax: '[nonextensible]',
        docUrl: createDocUrl('nonextensible')
    },

    'custom': {
        name: 'custom',
        category: 'attribute',
        description: 'Associates a custom GUID and value with a type library element.',
        syntax: 'custom(guid, value)',
        docUrl: createDocUrl('custom')
    },

    // ============================================
    // MARSHALING ATTRIBUTES
    // ============================================

    'context_handle': {
        name: 'context_handle',
        category: 'attribute',
        description: 'Defines a handle that maintains state between RPC calls. Used for stateful server operations.',
        syntax: '[context_handle]',
        example: `typedef [context_handle] void* MY_CONTEXT;`,
        docUrl: createDocUrl('context-handle')
    },

    'handle': {
        name: 'handle',
        category: 'attribute',
        description: 'Identifies a user-defined type as a handle type.',
        syntax: '[handle]',
        docUrl: createDocUrl('handle')
    },

    'transmit_as': {
        name: 'transmit_as',
        category: 'attribute',
        description: 'Specifies a different type for wire transmission. Requires helper functions for conversion.',
        syntax: '[transmit_as(type)]',
        docUrl: createDocUrl('transmit-as')
    },

    'wire_marshal': {
        name: 'wire_marshal',
        category: 'attribute',
        description: 'Specifies a type for wire transmission with custom marshaling code.',
        syntax: '[wire_marshal(type)]',
        docUrl: createDocUrl('wire-marshal')
    },

    'user_marshal': {
        name: 'user_marshal',
        category: 'attribute',
        description: 'Specifies custom marshaling for a type.',
        syntax: '[user_marshal(type)]',
        docUrl: createDocUrl('user-marshal')
    },

    'represent_as': {
        name: 'represent_as',
        category: 'attribute',
        description: 'Specifies a different local representation for a type.',
        syntax: '[represent_as(type)]',
        docUrl: createDocUrl('represent-as')
    },

    'v1_enum': {
        name: 'v1_enum',
        category: 'attribute',
        description: 'Transmits the enum as a 32-bit value instead of the default 16-bit.',
        syntax: '[v1_enum]',
        example: `typedef [v1_enum] enum { ... } MY_ENUM;`,
        docUrl: createDocUrl('v1-enum')
    },

    // ============================================
    // UNION/SWITCH ATTRIBUTES
    // ============================================

    'switch': {
        name: 'switch',
        category: 'keyword',
        description: 'Defines the discriminator for an encapsulated union.',
        syntax: 'switch (type name)',
        docUrl: createDocUrl('switch')
    },

    'switch_is': {
        name: 'switch_is',
        category: 'attribute',
        description: 'Specifies which parameter or field contains the union discriminator.',
        syntax: '[switch_is(expression)]',
        docUrl: createDocUrl('switch-is')
    },

    'switch_type': {
        name: 'switch_type',
        category: 'attribute',
        description: 'Specifies the type of the union discriminator for non-encapsulated unions.',
        syntax: '[switch_type(type)]',
        example: `typedef [switch_type(short)] union { ... } MY_UNION;`,
        docUrl: createDocUrl('switch-type')
    },

    'case': {
        name: 'case',
        category: 'keyword',
        description: 'Labels a union member with its discriminator value.',
        syntax: '[case(value)] type member;',
        docUrl: createDocUrl('case')
    },

    // ============================================
    // FUNCTION CALL ATTRIBUTES
    // ============================================

    'callback': {
        name: 'callback',
        category: 'attribute',
        description: 'Indicates the function is a callback from server to client.',
        syntax: '[callback]',
        docUrl: createDocUrl('callback')
    },

    'call_as': {
        name: 'call_as',
        category: 'attribute',
        description: 'Maps a local function to a remote function with a different signature.',
        syntax: '[call_as(function_name)]',
        docUrl: createDocUrl('call-as')
    },

    'async': {
        name: 'async',
        category: 'attribute',
        description: 'Indicates the function supports asynchronous calls.',
        syntax: '[async]',
        docUrl: createDocUrl('async')
    },

    'idempotent': {
        name: 'idempotent',
        category: 'attribute',
        description: 'Indicates the function can be called multiple times with the same result.',
        syntax: '[idempotent]',
        docUrl: createDocUrl('idempotent')
    },

    'broadcast': {
        name: 'broadcast',
        category: 'attribute',
        description: 'Indicates the function call is broadcast to all servers.',
        syntax: '[broadcast]',
        docUrl: createDocUrl('broadcast')
    },

    'maybe': {
        name: 'maybe',
        category: 'attribute',
        description: 'Indicates the call may not complete (fire-and-forget semantics).',
        syntax: '[maybe]',
        docUrl: createDocUrl('maybe')
    },

    'message': {
        name: 'message',
        category: 'attribute',
        description: 'Indicates the function uses message-based RPC.',
        syntax: '[message]',
        docUrl: createDocUrl('message')
    },

    // ============================================
    // ACF ATTRIBUTES
    // ============================================

    'auto_handle': {
        name: 'auto_handle',
        category: 'attribute',
        description: 'The RPC runtime automatically manages the binding handle.',
        syntax: '[auto_handle]',
        docUrl: createDocUrl('auto-handle')
    },

    'implicit_handle': {
        name: 'implicit_handle',
        category: 'attribute',
        description: 'Specifies a global variable for the binding handle.',
        syntax: '[implicit_handle(handle_type name)]',
        docUrl: createDocUrl('implicit-handle')
    },

    'explicit_handle': {
        name: 'explicit_handle',
        category: 'attribute',
        description: 'Requires an explicit binding handle parameter in each function.',
        syntax: '[explicit_handle]',
        docUrl: createDocUrl('explicit-handle')
    },

    'allocate': {
        name: 'allocate',
        category: 'attribute',
        description: 'Controls memory allocation for output parameters.',
        syntax: '[allocate(option)]',
        docUrl: createDocUrl('allocate')
    },

    'enable_allocate': {
        name: 'enable_allocate',
        category: 'attribute',
        description: 'Enables custom memory allocation for a function.',
        syntax: '[enable_allocate]',
        docUrl: createDocUrl('enable-allocate')
    },

    'encode': {
        name: 'encode',
        category: 'attribute',
        description: 'Generates serialization (pickling) encode functions.',
        syntax: '[encode]',
        docUrl: createDocUrl('encode')
    },

    'decode': {
        name: 'decode',
        category: 'attribute',
        description: 'Generates serialization (pickling) decode functions.',
        syntax: '[decode]',
        docUrl: createDocUrl('decode')
    },

    'fault_status': {
        name: 'fault_status',
        category: 'attribute',
        description: 'Returns RPC fault status in the parameter instead of raising an exception.',
        syntax: '[fault_status]',
        docUrl: createDocUrl('fault-status')
    },

    'comm_status': {
        name: 'comm_status',
        category: 'attribute',
        description: 'Returns RPC communication status in the parameter.',
        syntax: '[comm_status]',
        docUrl: createDocUrl('comm-status')
    },

    'code': {
        name: 'code',
        category: 'attribute',
        description: 'Generates stub code for the function (opposite of nocode).',
        syntax: '[code]',
        docUrl: createDocUrl('code')
    },

    'nocode': {
        name: 'nocode',
        category: 'attribute',
        description: 'Suppresses stub code generation for the function.',
        syntax: '[nocode]',
        docUrl: createDocUrl('nocode')
    },

    'notify': {
        name: 'notify',
        category: 'attribute',
        description: 'Generates a notification callback for the function.',
        syntax: '[notify]',
        docUrl: createDocUrl('notify')
    },

    'optimize': {
        name: 'optimize',
        category: 'attribute',
        description: 'Specifies stub optimization options.',
        syntax: '[optimize("option")]',
        docUrl: createDocUrl('optimize')
    },

    // ============================================
    // SYSTEM HANDLE ATTRIBUTES
    // ============================================

    'system_handle': {
        name: 'system_handle',
        category: 'attribute',
        description: 'Specifies a Windows handle type for secure marshaling.',
        syntax: '[system_handle(handle_type)]',
        docUrl: createDocUrl('system-handle')
    },

    // ============================================
    // OTHER ATTRIBUTES
    // ============================================

    'ignore': {
        name: 'ignore',
        category: 'attribute',
        description: 'Ignores a pointer during marshaling. The pointer is not transmitted.',
        syntax: '[ignore]',
        docUrl: createDocUrl('ignore')
    },

    'partial_ignore': {
        name: 'partial_ignore',
        category: 'attribute',
        description: 'Partially ignores a pointer during marshaling.',
        syntax: '[partial_ignore]',
        docUrl: createDocUrl('partial-ignore')
    },

    'annotation': {
        name: 'annotation',
        category: 'attribute',
        description: 'Adds SAL annotations for static analysis.',
        syntax: '[annotation("sal_annotation")]',
        docUrl: createDocUrl('annotate')
    },

    'entry': {
        name: 'entry',
        category: 'attribute',
        description: 'Specifies the DLL entry point for a module function.',
        syntax: '[entry("name")] or [entry(ordinal)]',
        example: `[entry("MyFunction")] long MyFunc([in] long x);`,
        docUrl: createDocUrl('entry')
    },

    'dllname': {
        name: 'dllname',
        category: 'attribute',
        description: 'Specifies the DLL that contains module functions.',
        syntax: 'dllname("filename.dll")',
        docUrl: createDocUrl('dllname')
    },

    'lcid': {
        name: 'lcid',
        category: 'attribute',
        description: 'Specifies the locale identifier for the type library.',
        syntax: 'lcid(locale_id)',
        example: `[uuid(...), lcid(0x0409)]
library MyLib { ... }`,
        docUrl: createDocUrl('lcid')
    },

    'helpcontext': {
        name: 'helpcontext',
        category: 'attribute',
        description: 'Specifies the help context ID for the element.',
        syntax: 'helpcontext(id)',
        docUrl: createDocUrl('helpcontext')
    },

    'helpfile': {
        name: 'helpfile',
        category: 'attribute',
        description: 'Specifies the help file for the type library.',
        syntax: 'helpfile("filename.chm")',
        docUrl: createDocUrl('helpfile')
    },

    'public': {
        name: 'public',
        category: 'attribute',
        description: 'Makes a typedef visible outside the IDL file.',
        syntax: '[public]',
        docUrl: createDocUrl('public')
    },

    'readonly': {
        name: 'readonly',
        category: 'attribute',
        description: 'Indicates a property is read-only (no propput).',
        syntax: '[readonly]',
        docUrl: createDocUrl('readonly')
    },

    'usesgetlasterror': {
        name: 'usesgetlasterror',
        category: 'attribute',
        description: 'Indicates the function sets the last-error code.',
        syntax: '[usesgetlasterror]',
        docUrl: createDocUrl('usesgetlasterror')
    },

    'uidefault': {
        name: 'uidefault',
        category: 'attribute',
        description: 'Indicates the member is the default for display in UI.',
        syntax: '[uidefault]',
        docUrl: createDocUrl('uidefault')
    },

    'nonbrowsable': {
        name: 'nonbrowsable',
        category: 'attribute',
        description: 'Hides the member from property browsers.',
        syntax: '[nonbrowsable]',
        docUrl: createDocUrl('nonbrowsable')
    },

    // ============================================
    // TYPES
    // ============================================

    'boolean': {
        name: 'boolean',
        category: 'type',
        description: '8-bit boolean value. Valid values are TRUE (non-zero) and FALSE (0).',
        syntax: 'boolean',
        docUrl: createDocUrl('boolean')
    },

    'byte': {
        name: 'byte',
        category: 'type',
        description: '8-bit unsigned data type.',
        syntax: 'byte',
        docUrl: createDocUrl('byte')
    },

    'char': {
        name: 'char',
        category: 'type',
        description: '8-bit character type. Default is unsigned in MIDL.',
        syntax: 'char',
        docUrl: createDocUrl('char-idl')
    },

    'small': {
        name: 'small',
        category: 'type',
        description: '8-bit signed integer.',
        syntax: 'small',
        docUrl: createDocUrl('small')
    },

    'short': {
        name: 'short',
        category: 'type',
        description: '16-bit signed integer.',
        syntax: 'short',
        docUrl: createDocUrl('short')
    },

    'int': {
        name: 'int',
        category: 'type',
        description: '32-bit signed integer.',
        syntax: 'int',
        docUrl: createDocUrl('int')
    },

    'long': {
        name: 'long',
        category: 'type',
        description: '32-bit signed integer.',
        syntax: 'long',
        docUrl: createDocUrl('long')
    },

    'hyper': {
        name: 'hyper',
        category: 'type',
        description: '64-bit signed integer.',
        syntax: 'hyper',
        docUrl: createDocUrl('hyper')
    },

    'float': {
        name: 'float',
        category: 'type',
        description: '32-bit IEEE floating-point number.',
        syntax: 'float',
        docUrl: createDocUrl('float')
    },

    'double': {
        name: 'double',
        category: 'type',
        description: '64-bit IEEE floating-point number.',
        syntax: 'double',
        docUrl: createDocUrl('double')
    },

    'void': {
        name: 'void',
        category: 'type',
        description: 'No type or return value. Used for procedures and void pointers.',
        syntax: 'void',
        docUrl: createDocUrl('void')
    },

    'wchar_t': {
        name: 'wchar_t',
        category: 'type',
        description: '16-bit wide character type for Unicode strings.',
        syntax: 'wchar_t',
        docUrl: createDocUrl('wchar-t')
    },

    'handle_t': {
        name: 'handle_t',
        category: 'type',
        description: 'Primitive RPC binding handle type.',
        syntax: 'handle_t',
        docUrl: createDocUrl('handle-t')
    },

    'error_status_t': {
        name: 'error_status_t',
        category: 'type',
        description: '32-bit unsigned integer for RPC error codes.',
        syntax: 'error_status_t',
        docUrl: createDocUrl('error-status-t')
    },

    'hresult': {
        name: 'HRESULT',
        category: 'type',
        description: '32-bit result code. Standard return type for COM methods. Contains severity, facility, and error code.',
        syntax: 'HRESULT',
        docUrl: createDocUrl('cyclic-redundancy-checks')
    },

    'bstr': {
        name: 'BSTR',
        category: 'type',
        description: 'OLE Automation string type. Length-prefixed Unicode string allocated with SysAllocString.',
        syntax: 'BSTR',
        docUrl: createDocUrl('cyclic-redundancy-checks')
    },

    'variant': {
        name: 'VARIANT',
        category: 'type',
        description: 'OLE Automation variant type. Self-describing union that can hold many data types.',
        syntax: 'VARIANT',
        docUrl: createDocUrl('cyclic-redundancy-checks')
    },

    'safearray': {
        name: 'SAFEARRAY',
        category: 'type',
        description: 'OLE Automation safe array. Self-describing array with bounds checking.',
        syntax: 'SAFEARRAY(type)',
        docUrl: createDocUrl('cyclic-redundancy-checks')
    },

    'pipe': {
        name: 'pipe',
        category: 'type',
        description: 'Streaming data type for transferring large amounts of data incrementally.',
        syntax: 'pipe element_type',
        example: `typedef pipe byte BYTE_PIPE;`,
        docUrl: createDocUrl('pipe')
    },

    // ============================================
    // MODIFIERS
    // ============================================

    'const': {
        name: 'const',
        category: 'modifier',
        description: 'Specifies a constant value that cannot be modified.',
        syntax: 'const type name = value;',
        docUrl: createDocUrl('const')
    },

    'signed': {
        name: 'signed',
        category: 'modifier',
        description: 'Specifies a signed integer type.',
        syntax: 'signed type',
        docUrl: createDocUrl('signed')
    },

    'unsigned': {
        name: 'unsigned',
        category: 'modifier',
        description: 'Specifies an unsigned integer type.',
        syntax: 'unsigned type',
        docUrl: createDocUrl('unsigned')
    },
};
