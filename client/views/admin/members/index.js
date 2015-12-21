ReactiveTemplates.set('collections.members.index', 'membersIndex');

Template.membersIndex.events({
  'click tr': function(event) {
    if (!$(event.target).is('td')) return;
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    var collection = rowData._collection();
    if (rowData) {
      if (rowData.canShowUpdate()) {
        var path = collection.updatePath(rowData);
        RouterLayer.go(path);
      }
    }
  }
});

Template.membersIndex.onRendered(function() {
  this.autorun(function () {
    RouterLayer.isActiveRoute('');
    Session.set('orionBootstrapCollectionsIndex_showTable', false);
    Meteor.defer(function () {
      Session.set('orionBootstrapCollectionsIndex_showTable', true);
    });
  });
})

Template.membersIndex.helpers({
  showTable: function () {
    return Session.get('orionBootstrapCollectionsIndex_showTable');
  }
});
