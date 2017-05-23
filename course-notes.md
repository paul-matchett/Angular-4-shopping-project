# Course Notes

////////////////////////////////////////////////////////////////////////////

**Understanding Data Binding**

1. String Interpolation - {{ data }}
2. Property Binding - [property]="data"
3. Event Binding = (event)="method"
4. Two Way Binding = [(ngModel)]="data"

////////////////////////////////////////////////////////////////////////////

**What are Directives**

1. Structural Directives - 
    *ngIf - 
    <div *ngIf="hero" >{{hero.name}}</div>

    *ngFor - 
    <ul>
        <li *ngFor="let list-item of list: let i = index; first as isFirst">
            <a href="">{{i}}: {{list-item.name} <span *ngIf="isFirst">({{list.length}})</span></a>
        </li>
    </ul>
    
    *ngSwitch -
    <div [ngSwitch]="hero?.emotion">
        <happy-hero    *ngSwitchCase="'happy'"    [hero]="hero"></happy-hero>
        <sad-hero      *ngSwitchCase="'sad'"      [hero]="hero"></sad-hero>
        <confused-hero *ngSwitchCase="'confused'" [hero]="hero"></confused-hero>
        <unknown-hero  *ngSwitchDefault           [hero]="hero"></unknown-hero>
    </div>

-----------------

2. Attribute Directives - 
    [ngStyle] = <p [ngStyle="{ background-color: getColor() }"]></p>
    [ngClass] = <div class="[ngClass=]{active: val == true}"></div>
    

////////////////////////////////////////////////////////////////////////////

**Chrome Debugging**

1. in developer tools, files can be found in Sources -> Webpack -> . -> src

-----------------

2. Augury chrome extension - https://augury.angular.io/

////////////////////////////////////////////////////////////////////////////

**Binding to Custom Properties**

1. on the parent.component.html:

    <app-parent-comp *ngFor="let list-item of list" [element]="list"></app-parent-comp>

-----------------

2. on the child.component.ts:

    @input() element: {type: string, name: string, content: string};

-----------------

3. @input() needs imported from core library in the child.component.ts file


////////////////////////////////////////////////////////////////////////////

**Assigning an alias to custom properties**

1. on the parent.component.html:

    <app-parent-comp *ngFor="let list-item of list" [elementWithAlias]="list"></app-parent-comp>

-----------------

2. on the child.component.ts:

    @input('elementWithAlias') element: {type: string, name: string, content: string};

-----------------

3. @input() needs imported from core library in the child.component.ts file


////////////////////////////////////////////////////////////////////////////

**Binding to Custom Events**


1. on the parent component: 

    // parent.component.ts
    onServerAdded(serverData: {serverName: string, serverContent: string}){
        this.serverElements.push({
            type: 'server',
            name: serverData.serverName,
            content: serverData.serverContent
        });
    }

    // parent.component.html
    <app-parent-comp (serverCreated)="onServerAdded($event)"></app-parent-comp>

-----------------

2. on the child.component.ts:

    @output() serverCreated = new EventEmitter<{serverData: {serverName: string, serverContent: string}}>();

    onAddServer(){
        this.serverCreated.emit({
            serverName: this.serverName, 
            serverContent: this.serverContent
        });
    }

-----------------

3. EventEmitter and @output() needs imported from core library in the child.component.ts file



////////////////////////////////////////////////////////////////////////////

**Assigning an alias to custom events**

1. on the parent.component.html:

    <app-parent-comp (sCreated)="onServerAdded($event)"></app-parent-comp>

-----------------

2. on the child.component.ts:

    @output('sCreated') serverCreated = new EventEmitter<{serverData: {serverName: string, serverContent: string}}>();


////////////////////////////////////////////////////////////////////////////

**Understanding View Encapsulation**

1. Creates a shadow dom effect and prefixes components class names.

-----------------

2. turn off encapsulation in sample.component.ts:

    import { Component, ViewEncapsulation } from '@angular/core';
    @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        encapsulation: ViewEncapsulation.None (Native or Emulated (default )
    })

////////////////////////////////////////////////////////////////////////////

**Using local References in Templates**

1. A local reference can be placed on any html element.

-----------------

2. Add a reference to the element (not the value):

    // sample.component.html
    <input
        type="text"
        class="form-control"
        #serverNameInput>
    <button
        class="btn btn-primary"
        (click)="onAddServer(serverNameInput)">Add Server</button>

    // sample.component.ts
    onAddServer(nameInput: HTMLInputEmelment){
        this.serverCreated.emit({
            serverName: nameInput.value, 
            serverContent: this.serverContent
        });
    }


////////////////////////////////////////////////////////////////////////////

**Getting Access to the Template & DOM with @ViewChild**

1. A local reference can be placed on any html element within tyscript and with an event.

-----------------

2. Add a reference to the element (not the value):

    // sample.component.html
    <input
        type="text"
        class="form-control"
        #serverContentInput>

    // sample.component.ts
    @ViewChild('serverContentInput') serverContentInput: ElementRef;

    onAddServer(nameInput: HTMLInputEmelment){
        this.serverCreated.emit({
            serverName: nameInput.value, 
            serverContent: serverContentInput.nativeElement.value;
        });
    }

-----------------

3. @ViewChild() and ElementRef needs imported from core library




////////////////////////////////////////////////////////////////////////////

**Project Content into Components with ng-content**

1. Passing complicated html from parent to chld component by adding it between the conconent html tags

-----------------

2. on the parent.component.html

    <app-parent-comp>
        <p>{{ name }}</p>
        <p>{{ Description }}
    </app-parent-comp>

-----------------

3. on the child.component.html

    <div class="container">
        <h1>Child Component</h1>
    </div>
    <div class="container">
        <ng-content></ng-content>
    </div>

-----------------

4. The content is projected into the child component. This is great for reusable widgets.



////////////////////////////////////////////////////////////////////////////

**Getting Access to ng-content with @ContentChild**

1. @ContentChild the same as @ViewChild, only is for accessing a local refernece placed inside ng-content.

-----------------

2. on the parent.component.html:

    <app-parent-comp>
        <p>{{ name }}</p>
        <p #contentParagraph>{{ Description }}
    </app-parent-comp>

-----------------

3. on the child.component.ts: 

    @contentChild('contentParagraph') contentParagraph: ElementRef;

    onAddServer(nameInput: HTMLInputEmelment){
        this.serverCreated.emit({
            serverName: nameInput.value, 
            serverContent: contentParagraph.nativeElement.TextContent;
        });
    }

-----------------

3. @contentChild() and ElementRef needs imported from core library in the child.component.ts file



////////////////////////////////////////////////////////////////////////////

**Understanding the component Lifecycle**

1. Lifecycle hooks methods in order:
    a. ngOnChanges - Can be executed multiple times. Called after a bound @input changes. 
    b. ngOnInit - Called once the compoent has been initialised.
    c. ngDoCheck - Can be executed multiple times. Called during every change detection runs within the template. 
    d. ngAfterContentInit - Called onlyb onece after content (ng-content) has been projected to the view. 
    e. ngAfterContentChecked - Called everytime the projected content has been checked. (via ngDoCheck)
    f. ngAfterViewOnit - Called after the component's view (and child views) has been initialised.
    g. ngAfterViewChecked - Called every time the view (and child views) have been checked. (via ngDoCheck)
    h. ngOnDestroy - Called once the component, directive, pipe or service is about to be destroyed. A chance to do some clean up work.

-----------------

2. ngOnChanges is the only hook that receives an argument which is of type SimpleChanges:

   ngOnChanges(changes: SimpleChanges) {}

-----------------

3. Good practise to implementing the above to the class:
    
    export class SampleComponent: implements OnInit, OnChanges {}

-----------------


4. All life cycle hooks (and SimpleChanges if using the ngOnChanges hook) needs imported from core library





